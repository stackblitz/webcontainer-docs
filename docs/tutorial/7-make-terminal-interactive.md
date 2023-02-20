---
title: &title Make terminal interactive
description: &description Your Express is up and running and we connected a terminal to the output of the WebContainer processes. Let's make the terminal more interactive allowing the user to run it's own commands.
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/tutorial-5_editing_a_file_updating_the_iframe.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
# Make terminal interactive

The terminal that we setup in the previous step doesn't accept user input, it's currently just a view to see the logs with proper formatting. Wouldn't it be nice if we could convert this experience to a real terminal which allows you to install other packages, and run different commands? Let's get started!

## 1. Remove code

Isn't the best feeling as a developer that you can remove code which isn't necessary anymore? You can remove both the `installDependencies` and `startDevServer` methods. The only thing that we want to keep is listening for the `server-ready` event.

```js {16-19}
window.addEventListener('load', async () => {
  textareaEl.value = files['index.js'].file.contents;
  textareaEl.addEventListener('input', (e) => {
    writeIndexJS(e.currentTarget.value);
  });

  const terminal = new Terminal({
    convertEol: true,
  });
  terminal.open(terminalEl);

  // Call only once
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });
});
```

Open the `loading.html` file and change the message.

```html
Use the terminal to run a command!
```

## 2. Start the shell

In order to make the terminal a bit more usuable, instead of spawning commands separately, we could spawn `JSH` instead. 

```js
/**
 * @param {Terminal} terminal
 */
async function startShell(terminal) {
  const shellProcess = await webcontainerInstance.spawn('jsh');
  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    })
  );
}
```

By connecting the output stream of our process to the Xterm.js terminal instance, we will see something that looks much more like a real interactive terminal you are familiar with. The only thing we still have to do is start the shell.

```js {21}
window.addEventListener('load', async () => {
  textareaEl.value = files['index.js'].file.contents;
  textareaEl.addEventListener('input', (e) => {
    writeIndexJS(e.currentTarget.value);
  });

  const terminal = new Terminal({
    convertEol: true,
  });
  terminal.open(terminalEl);

  // Call only once
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });

  startShell(terminal);
});
```

TODO add screenshot?

## 3. Making the terminal interactive

It's still not possible to actually do anything with the terminal. Currently, the terminal still only renders output, it does not yet accept input. Let's change that!

Just like the [`output`](/api#▸-output-readablestream-string) property of the WebContainer process is a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), the [`input`](/api#▸-input-writablestream-string) property of the process is a [`WritableStream`](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream). By writing data to the writable `input` stream, that data is sent to the WebContainer process.

```js {11-14}
async function startShell(terminal) {
  const shellProcess = await webcontainerInstance.spawn('jsh');
  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    })
  );

  const input = shellProcess.input.getWriter();
  terminal.onData((data) => {
    input.write(data);
  });

  return shellProcess;
}
```

The first thing we do here is getting hold of a writer by using [`WritableStream.getWriter`](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream/getWriter). Calling this method will lock the input stream which means no one else could get another writer to that process. After we have our writer, we can listen for input received by the terminal. Every time you type a character in the terminal, the [`onData`](http://xtermjs.org/docs/api/terminal/classes/terminal/#ondata) handler is called. Inside that handler we can simply write the data to the `input` stream of our process.

After this small change, we now entirely hooked up our terminal to the shell running in the WebContainer process. This means that we can now also send input to the process and run commands. You can now manually run `npm install && npm run start` or run any other command.

TODO insert screenshot

## 4. Window resizing

You might've noticed that resizing the window doesn't redraw the terminal output. For instance, if you make the window very small, lines that are too long should wrap to the next line. In order to fix this, we have to make the WebContainer process aware of the size of the terminal.

First of all, let's make sure that the terminal itself gets adjusted properly when resizing the window. For that, we can use the [xterm-addon-fit](http://xtermjs.org/docs/api/addons/fit/) plugin for Xterm.js which adjusts the terminal columns and rows depending on the element it's rendered in.

Install the plugin first.

```
npm install xterm-addon-fit
```

And import it at the top of your `main.js` file.

```js
import { FitAddon } from 'xterm-addon-fit';
```

After we installed and imported the addon, we can create a new `FitAddon` instance and load it into the terminal.

```js {7,12,15}
window.addEventListener('load', async () => {
  textareaEl.value = files['index.js'].file.contents;
  textareaEl.addEventListener('input', (e) => {
    writeIndexJS(e.currentTarget.value);
  });

  const fitAddon = new FitAddon();

  const terminal = new Terminal({
    convertEol: true,
  });
  terminal.loadAddon(fitAddon);
  terminal.open(terminalEl);

  fitAddon.fit();

  // Call only once
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });

  startShell(terminal);
});
```

We also call the `fit()` method on the addon immediately after attaching the terminal to the DOM to make sure that the terminal takes up the entire height and width of the `div` terminal element.

The terminal itself now has the proper dimensions, but the WebContainer process that runs the shell is still not aware of what the exact dimensions are. To fix that, we can pass in the dimensions when spawning the WebContainer process.

```js {3-6}
async function startShell(terminal) {
  const shellProcess = await webcontainerInstance.spawn('jsh', {
    terminal: {
      cols: terminal.cols,
      rows: terminal.rows,
    },
  });
  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    })
  );

  const input = shellProcess.input.getWriter();

  terminal.onData((data) => {
    input.write(data);
  });
}
```

When making the preview window very narrow and refreshing the page, you can now see that the text is properly wrapped to the width of the terminal.

TODO Insert screenshot?

The last problem we have to address is that if you now resize the window, the shell does not redraw the text to fit the new dimensions. In order to do that, we can use the [`resize`](/api#▸-resize) method on the WebContainer shell process.

```js {26-32}
window.addEventListener('load', async () => {
  textareaEl.value = files['index.js'].file.contents;
  textareaEl.addEventListener('input', (e) => {
    writeIndexJS(e.currentTarget.value);
  });

  const fitAddon = new FitAddon();

  const terminal = new Terminal({
    convertEol: true,
  });
  terminal.loadAddon(fitAddon);
  terminal.open(terminalEl);

  fitAddon.fit();

  // Call only once
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });

  const shellProcess = await startShell(terminal);
  window.addEventListener('resize', () => {
    fitAddon.fit();
    shellProcess.resize({
      cols: terminal.cols,
      rows: terminal.rows,
    });
  });
});
```

The last piece of code that we added first resizes the terminal element on our webpage. Because of this, the `cols` and `rows` of the Xterm.js `Terminal` instance are recalculated and updated. The only thing for us left to do is to notify the process that a resize event happened and we pass in the new dimensions of the terminal. This causes the process to redraw the screen.

TODO attach animated screenshot?

## Next steps

If you'd like to explore the API on your own, you can check out the [API reference](../api) or see the [projects made by our Community](/guides/community-inspirations).
