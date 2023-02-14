---
title: &title Quickstart
description: &description This page provides the bare-minimum overview on how to start building with WebContainer API.
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-quickstart.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
# Quickstart

This page provides the bare-minimum overview on how to start building with WebContainer API.

::: tip Prefer learning through tutorials?
We have prepared a [step-by-step walkthrough](../tutorial/1-building-your-first-webcontainers-app) for you!
:::

**The WebContainer API starter is the fastest way to explore the API**. Open it in StackBlitz editor:
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://webcontainer.new)

or in Codeflow IDE, our full-fledged web environment:
[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https:///pr.new/github.com/stackblitz/webcontainer-api-starter)

If you prefer to develop locally, follow the steps below.

## Install WebContainer API

To install the WebContainer API, run the following code in the terminal while inside your project folder:

```bash
npm i @webcontainer/api
```

## 1. Create a WebContainer instance

To create a WebContainer instance, import `WebContainer` from `@webcontainer/api` in a JavaScript file and call the `boot` method:

```js
import { WebContainer } from '@webcontainer/api';

// Call only once
const webcontainerInstance = await WebContainer.boot();
```

::: warning
Please note that **the `boot` method can be called only once** and **only a single WebContainer instance** can be created.
:::

### Cross-Origin Isolation

WebContainers _require_ [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer), which, in turn, requires the website where they are running to be cross-origin isolated. Because of that, you'll need to set COOP/COEP headers:

```yaml
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

To learn more about this topic and see how to do it, check [Configuring Headers](./configuring-headers.md).

## 2. Working with the file system

The API provides an `fs` object to work with the file system. You can read more about them on the [File System](./working-with-the-file-system.md) page.

Currently, the following methods are available:

- `readFile`, which reads a file system,
- `readdir`, which asynchronously reads the contents of a given directory,
- `rm`, which is used to delete a file at the given path (handy with resetting examples),
- `writeFile`, which is used to write to a file or create it,
- `mkdir`, which creates a directory.

To load your files into the WebContainer, use the `mount` method which will "copy" them into the file system:

```js
await webcontainerInstance.mount(projectFiles);
```

::: tip Tip from the community
For optimal performance, we recommend using the `mount()` method for an instant hydration of the file system. This is especially helpful on page load, where typically a lot of files are written at once.
:::

## 3. Running commands and processes

Add methods to start and exit the dev server, as well as to run the WebContainer instance:

```js
async function startDevServer() {
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);

  const installExitCode = await installProcess.exit;

  if (installExitCode !== 0) {
    throw new Error('Unable to run npm install');
  }

  // `npm run dev`
  await webcontainerInstance.spawn('npm', ['run', 'dev']);
}
```

## 4. Preview

After you have started the dev server, get the URL from `port-ready` event and mount it in an iframe:

```js
webcontainerInstance.on('server-ready', (port, url) => (iframeEl.src = url));
```

where `iframeEl` is the reference to your iframe.

And that's it! You have successfully set up your first WebContainer app 🥳

## Before you deploy - serve over HTTPS

Please note that your deployed page must be served over HTTPS. This is not necessary when developing locally, as `localhost` is exempt from some browser restrictions, but there is no way around it once you deploy to production.

## Next steps

We also prepared a thorough [step-by-step tutorial](../tutorial/1-building-your-first-webcontainers-app) if you learn best with walkthroughs.

If you'd like to explore the API on your own, you can check out the [API Reference](../api) or see the [projects made by our Community](/guides/community-inspirations).
