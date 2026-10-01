import type { FileSystemTree, WebContainer } from '@webcontainer/api';
import { acquireWebContainer, releaseWebContainer } from '../../../scripts/webcontainer';
import { isWebContainerSupported } from '../../Examples/WCEmbed/utils';
import type { Files } from './project';

export type Status = 'booting' | 'installing' | 'starting' | 'ready' | 'unsupported' | 'error';

export interface ProjectCallbacks {
  onStatus(status: Status): void;
  /** Last line of process output, useful while installing. */
  onLog(line: string): void;
  onServerReady(url: string): void;
}

const ANSI = /\x1b\[[0-9;?]*[A-Za-z]/g;

/** Boots a WebContainer, mounts `files`, installs dependencies and starts the Vite dev server. */
export function startProject(files: Files, callbacks: ProjectCallbacks) {
  if (!isWebContainerSupported()) {
    callbacks.onStatus('unsupported');

    return { writeFiles: async () => {}, dispose() {} };
  }

  let isDisposed = false;

  const instance = acquireWebContainer({ workdirName: 'tip-calculator' }, () => {
    isDisposed = true;
  });

  const emit = <K extends keyof ProjectCallbacks>(key: K, ...args: Parameters<ProjectCallbacks[K]>) => {
    if (!isDisposed) {
      (callbacks[key] as (...args: unknown[]) => void)(...args);
    }
  };

  const log = () =>
    new WritableStream<string>({
      write(data) {
        const line = data.replace(ANSI, '').split(/[\r\n]/).map((part) => part.trim()).filter(Boolean).pop();

        if (line) {
          emit('onLog', line);
        }
      },
    });

  (async () => {
    emit('onStatus', 'booting');

    const wc = await instance;

    await wc.mount(toTree(files));

    emit('onStatus', 'installing');

    const install = await wc.spawn('npm', ['install']);

    install.output.pipeTo(log());

    if ((await install.exit) !== 0) {
      throw new Error('npm install failed');
    }

    emit('onStatus', 'starting');

    wc.on('server-ready', (_port, url) => {
      emit('onServerReady', url);
      emit('onStatus', 'ready');
    });

    const dev = await wc.spawn('npm', ['run', 'dev']);

    dev.output.pipeTo(log());
  })().catch((error) => {
    console.error(error);
    emit('onStatus', 'error');
  });

  return {
    async writeFiles(changed: Files) {
      const wc = await instance;

      for (const [path, contents] of Object.entries(changed)) {
        await ensureParent(wc, path);
        await wc.fs.writeFile(path, contents);
      }
    },
    dispose() {
      isDisposed = true;
      releaseWebContainer(instance);
    },
  };
}

export function toTree(files: Files) {
  const tree: FileSystemTree = {};

  for (const [path, contents] of Object.entries(files)) {
    const segments = path.split('/');
    const name = segments.pop()!;
    let dir = tree;

    for (const segment of segments) {
      const node = (dir[segment] ??= { directory: {} });

      dir = 'directory' in node ? node.directory : {};
    }

    dir[name] = { file: { contents } };
  }

  return tree;
}

async function ensureParent(wc: WebContainer, path: string) {
  const parent = path.split('/').slice(0, -1).join('/');

  if (parent) {
    await wc.fs.mkdir(parent, { recursive: true });
  }
}
