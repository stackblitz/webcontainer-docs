import { closeBrackets } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { bracketMatching, indentOnInput } from '@codemirror/language';
import { Compartment, EditorState } from '@codemirror/state';
import {
  EditorView,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers
} from '@codemirror/view';
import type { WebContainerProcess } from '@webcontainer/api';
import { WebContainer } from '@webcontainer/api';
import pDefer from 'p-defer';
import type { Ref } from 'vue';
import { isWebContainerSupported, wordWrap } from './utils';
import { vsCodeDarkPlus, vsCodeDarkPlusTerminalTheme } from './vscode-dark-plus';
import { vsCodeLightPlus, vsCodeLightPlusTerminalTheme } from './vscode-light-plus';

type DirtyListener = (isDirty: boolean) => void;

let webcontainer: Promise<WebContainer>;
let currentProcess: WebContainerProcess;
let shellWriter: WritableStreamDefaultWriter<string>;
let terminal: (import('xterm').Terminal & { fit?: () => void }) | undefined;
let editor: EditorView;

const editorThemeConfig = new Compartment();

const dirtyListeners = new Set<DirtyListener>();

const indexFile = `import chalk from 'chalk';

console.log(chalk.magenta('Hello from the WebContainer API 👋'));
console.log(chalk.green(\`Running Node \${process.version}\`));

// Run \`node index.js\` from the terminal
`;

const packageJson = {
  name: 'wc-api-demo',
  type: 'module',
  dependencies: {
    chalk: '^5.2.0',
  },
};

const pnpmLockFile = `lockfileVersion: 5.4

specifiers:
  chalk: ^5.2.0

dependencies:
  chalk: 5.2.0

packages:

  /chalk/5.2.0:
    resolution: {integrity: sha512-ree3Gqw/nazQAPuJJEy+avdl7QfZMcUvmHIKgEZkGL+xOBzRvup5Hxo6LHuMceSxOabuJLJm5Yp/92R9eMmMvA==}
    engines: {node: ^12.17.0 || ^14.13 || >=16.0.0}
    dev: false
`;

const red = (text: string) => `\x1b[1;31m${text}\x1b[37m`;

export async function init(isDark: Ref<boolean>, editorElement: HTMLElement, terminalElement: HTMLElement) {
  const terminal = await createTerminal(isDark, terminalElement);

  const editor = createEditor(isDark, editorElement);

  await bootWebContainer(terminal);

  return {
    run(command: string) {
      if (shellWriter == null) {
        return;
      }

      shellWriter.write(`${command}\n`);
    },
    updateTheme(isDark: Ref<boolean>) {
      terminal.options.theme = isDark.value ? vsCodeDarkPlusTerminalTheme : vsCodeLightPlusTerminalTheme;

      editor.dispatch({
        effects: [editorThemeConfig.reconfigure(isDark.value ? vsCodeDarkPlus : vsCodeLightPlus)]
      });
    },
    onDirty(listener: DirtyListener) {
      dirtyListeners.add(listener);

      return () => {
        dirtyListeners.delete(listener);
      };
    },
    onResize() {
      terminal.fit?.();

      currentProcess?.resize({
        cols: terminal.cols,
        rows: terminal.rows,
      });
    }
  }
}

async function bootWebContainer(terminal: import('xterm').Terminal) {
  if (!isWebContainerSupported()) {
    terminal.reset();
    terminal.write(
      wordWrap(
        [
          red('Incompatible Web Browser'),
          '',
          `WebContainers currently work in Chromium-based browsers and Firefox. We're hoping to add support for more browsers as they implement the necessary Web Platform features.`,
          '',
          'Read more about browser support:',
          'https://webcontainers.io/guides/browser-support',
          ''
        ].join('\n'),
        terminal.cols
      )
    );

    return;
  }

  if (webcontainer) {
    return webcontainer;
  }

  terminal.write('Booting WebContainer...');

  webcontainer = WebContainer.boot();

  try {
    const wc = await webcontainer;

    terminal.reset();

    wc.mount({
      'index.js': {
        file: {
          contents: indexFile,
        },
      },
      'package.json': {
        file: {
          contents: JSON.stringify(packageJson),
        },
      },
      'pnpm-lock.yaml': {
        file: {
          contents: pnpmLockFile,
        },
      },
    });

    async function main() {
      // we set an infinite loop so that when the user runs the `exit` command, we restart
      while (true) {
        currentProcess = await wc.spawn('jsh', {
          terminal: {
            cols: terminal.cols,
            rows: terminal.rows,
          },
        });

        const jshReady = pDefer();
        let isJSHReady = false;

        // write the process output to the terminal
        currentProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              if (data.includes('❯') && !isJSHReady) {
                isJSHReady = true;

                jshReady.resolve();
              }

              terminal.write(data);
            },
          }) 
        );

        shellWriter = currentProcess.input.getWriter();

        await jshReady.promise;

        shellWriter.write('pnpm install\n');

        // write the terminal input to the process
        const terminalWriter = terminal.onData((data) => {
          shellWriter.write(data);
        });

        // wait for the process to finish
        await currentProcess.exit;

        terminal.clear();
        terminalWriter.dispose();
      }
    }

    main();
  } catch {
    terminal.write(
      wordWrap(
        [
          `\x1b[G${red(`Looks like your browser's configuration is blocking WebContainers.`)}`,
          '',
          `Let's troubleshoot this!`,
          '',
          'Read more at:',
          'https://webcontainers.io/guides/browser-config',
          ''
        ].join('\n'),
        terminal.cols,
      )
    );
  }

  return webcontainer;
}

async function createTerminal(isDark: Ref<boolean>, element: HTMLElement) {
  element.innerHTML = '';

  if (terminal) {
    terminal.options.theme = isDark.value ? vsCodeDarkPlusTerminalTheme : vsCodeLightPlusTerminalTheme;
    terminal.open(element);

    return terminal;
  }

  const xterm = await import('xterm');
  const xtermAddonFit = await import('xterm-addon-fit');
  const xtermAddonWebLinks = await import('xterm-addon-web-links');
  const { Terminal } = xterm;
  const { FitAddon } = xtermAddonFit;
  const { WebLinksAddon } = xtermAddonWebLinks;

  terminal = new Terminal({
    convertEol: true,
    cursorBlink: true,
    disableStdin: false,
    theme: isDark.value ? vsCodeDarkPlusTerminalTheme : vsCodeLightPlusTerminalTheme,
    fontSize: 12,
    fontFamily: 'Menlo, courier-new, courier, monospace',
  });

  terminal.open(element);

  // we attach a FitAddon instance to help with resizing. Every time
  // we feel like the terminal element has changed size, we'll use the
  // addon to force a re-render
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  terminal.loadAddon(new WebLinksAddon());

  fitAddon.fit();

  // attach a `fit()` method to the terminal so we can easily resize it
  terminal = Object.assign(terminal, {
    fit() {
      fitAddon.fit();
    }
  });

  return terminal;
}

function createEditor(isDark: Ref<boolean>, element: HTMLElement) {
  element.innerHTML = '';

  if (editor) {
    element.appendChild(editor.dom);

    return editor;
  }

  let saveTimeout: NodeJS.Timeout | undefined;

  function notifyDirty(isDirty: boolean) {
    for (const listener of dirtyListeners) {
      listener(isDirty);
    }
  }

  async function saveFile() {
    if (webcontainer != null) {
      const wc = await webcontainer;
      wc.fs.writeFile('/index.js', editor.state.doc.toString());
      notifyDirty(false);
    }
  }

  editor = new EditorView({
    doc: indexFile,
    extensions: [
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          notifyDirty(true);

          if (saveTimeout != null) {
            clearTimeout(saveTimeout);
          }

          saveTimeout = setTimeout(() => {
            saveFile();
          }, 300);
        }
      }),
      highlightSpecialChars(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.domEventHandlers({
        keydown: (event) => {
          if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();

            saveFile();
          }
        },
      }),
      EditorState.tabSize.of(2),
      indentOnInput(),
      highlightActiveLineGutter(),
      lineNumbers(),
      bracketMatching(),
      closeBrackets(),
      javascript(),
      editorThemeConfig.of([isDark.value ? vsCodeDarkPlus : vsCodeLightPlus])
    ],
  });

  element.appendChild(editor.dom);

  return editor;
}
