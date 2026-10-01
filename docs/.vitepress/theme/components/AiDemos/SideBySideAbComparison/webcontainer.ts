// the lockfile skips dependency resolution on install; see ../AiEvaluationAndDebugging/project.ts
import packageJson from '../AiEvaluationAndDebugging/template/package.json?raw';
import packageLock from '../AiEvaluationAndDebugging/template/package-lock.json?raw';
import { acquireWebContainer, releaseWebContainer } from '../../../scripts/webcontainer';
import { isWebContainerSupported } from '../../Examples/WCEmbed/utils';
import { toTree, type Status } from '../AiEvaluationAndDebugging/webcontainer';
import type { Files } from '../AiEvaluationAndDebugging/project';
import type { Run } from './runs';

export interface ComparisonCallbacks {
  onStatus(runId: string, status: Status): void;
  /** Last line of the run's process output, useful while installing. */
  onLog(runId: string, line: string): void;
  onServerReady(runId: string, url: string): void;
}

const ANSI = /\x1b\[[0-9;?]*[A-Za-z]/g;
const BASE_PORT = 5173;

export const portOf = (runs: Run[], runId: string) => BASE_PORT + runs.findIndex((run) => run.id === runId);

/**
 * Boots one WebContainer with every run mounted under `runs/<id>` and a single shared install.
 * `serve` starts a Vite dev server for a run on its own port; runs that are never served cost nothing.
 */
export function startComparison(runs: Run[], callbacks: ComparisonCallbacks) {
  if (!isWebContainerSupported()) {
    return {
      serve: (runId: string) => callbacks.onStatus(runId, 'unsupported'),
      dispose() {},
    };
  }

  let isDisposed = false;

  const instance = acquireWebContainer({ workdirName: 'ab-comparison' }, () => {
    isDisposed = true;
  });

  const emit = <K extends keyof ComparisonCallbacks>(key: K, ...args: Parameters<ComparisonCallbacks[K]>) => {
    if (!isDisposed) {
      (callbacks[key] as (...args: unknown[]) => void)(...args);
    }
  };

  const served = new Set<string>();
  const portToRun = new Map<number, string>();

  // shared phase until install finishes, broadcast to every run waiting on it
  let phase: Status = 'booting';

  const setPhase = (status: Status) => {
    phase = status;
    served.forEach((runId) => emit('onStatus', runId, status));
  };

  const log = (runIds: () => Iterable<string>) =>
    new WritableStream<string>({
      write(data) {
        const line = data.replace(ANSI, '').split(/[\r\n]/).map((part) => part.trim()).filter(Boolean).pop();

        if (line) {
          for (const runId of runIds()) {
            emit('onLog', runId, line);
          }
        }
      },
    });

  const installed = (async () => {
    const wc = await instance;

    const files: Files = { 'package.json': packageJson, 'package-lock.json': packageLock };

    for (const run of runs) {
      for (const [path, contents] of Object.entries(run.files)) {
        files[`runs/${run.id}/${path}`] = contents;
      }

      // concurrent servers would otherwise race on the shared node_modules/.vite
      files[`runs/${run.id}/vite.config.js`] = `export default { cacheDir: '.vite' };\n`;
    }

    await wc.mount(toTree(files));

    setPhase('installing');

    const install = await wc.spawn('npm', ['install']);

    install.output.pipeTo(log(() => served));

    if ((await install.exit) !== 0) {
      throw new Error('npm install failed');
    }

    wc.on('server-ready', (port, url) => {
      const runId = portToRun.get(port);

      if (runId) {
        emit('onServerReady', runId, url);
        emit('onStatus', runId, 'ready');
      }
    });

    phase = 'starting';

    return wc;
  })();

  installed.catch((error) => {
    console.error(error);
    setPhase('error');
  });

  async function startServer(runId: string) {
    const wc = await installed;
    const port = portOf(runs, runId);

    portToRun.set(port, runId);
    emit('onStatus', runId, 'starting');

    const dev = await wc.spawn('node', [
      'node_modules/vite/bin/vite.js',
      `runs/${runId}`,
      '--port',
      String(port),
      '--strictPort',
    ]);

    dev.output.pipeTo(log(() => [runId]));

    // a dev server only exits on failure
    dev.exit.then(() => emit('onStatus', runId, 'error'));
  }

  return {
    serve(runId: string) {
      if (served.has(runId)) {
        return;
      }

      served.add(runId);

      if (phase !== 'starting') {
        emit('onStatus', runId, phase);
      }

      startServer(runId).catch((error) => {
        if (phase !== 'error') {
          console.error(error);
          emit('onStatus', runId, 'error');
        }
      });
    },
    dispose() {
      isDisposed = true;
      releaseWebContainer(instance);
    },
  };
}
