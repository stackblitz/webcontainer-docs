---
title: &title Running Processes
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-running_commands.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
---
# Running Processes

This page covers executing commands inside WebContainers.

## Mental model

In WebContainers, processes are executed as follows:

```js
webcontainerInstance.spawn('npm', ['install']);
```

The method `spawn` takes three arguments:

- a string representing the command,
- an array with the command options,
- and, not required, spawn options (for example, specifying environment variables, disabling output, or specifying the size of the attached terminal).

In this case, we are running `npm install`. If our command had multiple arguments, like for example `ls src -l`, all the arguments would be added to the array like so:

```js
webcontainerInstance.spawn('ls', ['src', '-l']);
```

## Installing dependencies

Let's take a look at the following function that, when invoked, will install dependencies in a WebContainer instance:

```js
async function installDependencies() {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  // Wait for install command to exit
  return installProcess.exit;
}
```

Having installed the dependencies, this function will return the exit code (`0` for a successful exit).

## Reading process output

Calling `spawn` returns a `WebContainerProcess`. Every process has an `output` property of type `ReadableStream<string>` that receives all terminal output, including the `stdout` and `stderr` emitted by the spawned process and its descendants (for example, child processes).

::: info Deep dive: `ReadableStream`

The output property is a `ReadableStream`. That’s because it is, in fact, a stream that can emit strings numerous times, just like the actual `stdout` or `stderr` from a process in Node.js. The advantage of streams is that they allow composition, meaning we can pipe data from one stream into another stream, for example `source.pipeTo(destination)`. Furthermore, streams can be transferred via `postMessage` from one context to a different context, for example a web worker. A `ReadableStream` also keeps a buffer of the data which is only flushed once you start reading.

If you want to read data from output you can pipe it into a `WriteableStream` just like in the example below.

:::

Output can be disabled by passing optional options to `spawn` and setting `output: false`. When set to `false`, the `output` stream will never receive any data.
An example of a usage could be the following:

```js
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);

  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));
```

## Running a dev server

WebContainers expose three events through the method `on`:

- `server-ready`, which is emitted when the server is ready to accept requests,
- `port`, which is emitted when a port is open or closed by a process,
- `error`, emitted when an internal error is triggered.

The `server-ready` event can be used to, for example, run a dev server via `npm run start`:

```js
async function startDevServer() {
  // Run `npm run start` to start the Express app
  await webcontainerInstance.spawn('npm', ['run', 'start']);

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    // ...
  });
}
```

## Next steps

To further explore the WebContainer API in [our WebContainer API starter](https://webcontainer.new), check the [API Reference](../api) or follow [our tutorial](../tutorial/1-build-your-first-webcontainer-app.md) and build your first WebContainer app.
