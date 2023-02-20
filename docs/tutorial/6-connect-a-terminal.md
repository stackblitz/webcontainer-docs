---
title: &title Connect a terminal
description: &description Your Express is up and running and the Preview window reflects the changes made through the `textarea`. Let's add a terminal to show the output of our running processes.
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/tutorial-5_editing_a_file_updating_the_iframe.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
# Connecting a terminal

Your Express app is up and running and the preview updates automatically when making changes through the `textarea`. However, opening the DevTools to see the WebContainers output is a bit annoying. So let's add a terminal which shows the output.

## 1. Install Xterm.js

We could print the output of our processes to a simple `div`. The problem is that a process could also print messages with different colors or styles. In order to achieve this, we will use [xterm.js](https://xtermjs.org). Install it by running the following command.

```
npm install xterm
```

## 2. Create the terminal

In order to show the terminal in our application, we need to add an additional HTML element which we can then use to render the terminal. Open the `main.js` file, scroll to the bottom and add a new `div` which we can use as a parent element for our terminal.

```js {10}
document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="editor">
      <textarea>I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe src="loading.html"></iframe>
    </div>
  </div>
  <div class="terminal"></div>
`;
```

We also need to be able to reference the HTML element. In the same way as we reference our `textarea` and `iframe`, we can add the following line at the bottom of the `main.js` file.

```js
/** @type {HTMLTextAreaElement | null} */
const terminalEl = document.querySelector('.terminal');
```

Now that we added the DOM node which we can use to render the terminal, we can create a terminal instance and render it.

First of all we need to import Xterm.js. Add the import at the top of the `main.js` file.

```js
import { Terminal } from 'xterm'
```

Now we can create a new terminal and attach it to our `terminalEl` that we created before.

```js {7-10}
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

  const exitCode = await installDependencies();
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  };

  startDevServer();
});
```

The reason we set `convertEol` to `true` is to force the cursor to always start at the beginning of the next line. If we don't enable this, the cursor will jump to the next line but does not jump to the start of the new line.

You will notice that the terminal looks a bit weird. So let's fix that first! Xterm.js ships it's own CSS styles and can easily be imported at the top of our `main.js` file.

```js
import 'xterm/css/xterm.css';
```

TODO insert screenshot

## 3. Send output to the terminal

Now that our terminal is entirely setup, we can start redirecting the output of the WebContainer processes to that terminal instead of writing it to the DevTools console.

To do that, we need to get hold of the `terminal` instance inside the `installDependencies` and `startDevServer` methods. We can do this by simply passing `terminal` as an argument to those methods.

```js {16,21}
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

  const exitCode = await installDependencies(terminal);
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  };

  startDevServer(terminal);
});
```

Inside the `installDependencies` method, we now have a reference to the terminal instance. Instead of printing the data to the DevTools console, we can write it to the terminal instead.

```js {4,9}
/**
 * @param {Terminal} terminal
 */
async function installDependencies(terminal) {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      terminal.write(data);
    }
  }))
  // Wait for install command to exit
  return installProcess.exit;
}
```

When you refresh the page, you will now see that the output of `npm install` is now shown in our the terminal we just created.

TODO insert screenshot

In order to show the output of the `npm run start` command, we can make identical changes for the `startDevServer` method.

```js {4,10-16}
/**
 * @param {Terminal} terminal
 */
async function startDevServer(terminal) {
  // Run `npm run start` to start the Express app
  const serverProcess = await webcontainerInstance.spawn('npm', [
    'run',
    'start',
  ]);
  serverProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    })
  );

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });
}
```

Now that we made these changes, we not only see the output of the `npm install` command, but also from the `npm run start` command. When changing the code through the `textarea`, you will also see that the dev server restarts because of the changes you made.

TODO insert screenshot

## Next step

The output is now visible in a terminal inside your web application. This improves the user experience because the user can now see what is going on and doesn't have to open the DevTools console anymore.

The terminal is currently only a view for the output. [In the next step](./7-make-terminal-interactive.md), we'll make the terminal interactive allowing you to run your own commands from within your application.
