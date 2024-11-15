`---
title: &title Troubleshooting
description: &description This page offers troubleshooting tips for WebContainers.
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-troubleshooting.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
# Troubleshooting

This page offers troubleshooting tips, solutions to known problems, and tricks - often contributed by our Community members. Don't see a fix to your problem here? Let us know by [opening an issue](https://github.com/stackblitz/webcontainer-docs/issues)!

::: warning
WebContainers won't run properly (or at all) if cookie blockers, third-party or browser built-in ones, are enabled. Check the `on('error')` event and [StackBlitz docs](https://developer.stackblitz.com/docs/platform/third-party-blocker) to learn more.
:::

## Slow boot time

To improve your project's boot time, pass both `package-lock.json` and `package.json` to the file system. Without `package-lock.json` Turbo, our npm client, first generates a fresh lockfile and only then downloads dependencies, resulting in a slower boot time.

:::tip Tip from the community
[SvelteKit bypasses Turbo install](https://github.com/sveltejs/learn.svelte.dev/pull/67) by bundling the files so they can be cached and written straight to the virtual file system. Including `package-lock.json` was not an ideal solution given that different sections of their tutorial have different dependencies.
:::

Alternatively, you can create and populate the `node_modules` folder yourself if you want your app to be runnable via script commands like `npm run`.

## Turbo fails to load

In case lockfile resolution times out, you will see the following error:

> Access to fetch at [URL] from origin [URL] has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled

To prevent the timeout, add `package-lock.json` to the file system which will speed up the dependency installation. For more information, see the ["Slow boot time"](#slow-boot-time) tip.

## Proxy error

If the `boot()` is called more than once, you may see the following error:

> Uncaught (in promise) Error: Proxy has been released and is not usable

Make sure that `boot()` is only called once, even in the presence of HMR (hot module replacement).

## WebContainers not loading and `postMessage` error

If all repeat requests are served without any headers and with the `304` status, access to `SharedArrayBuffers` will be denied. For example, if you're getting the following error message:

> Uncaught (in promise) Error: Failed to execute ‘postMessage’ on ‘Worker’: SharedArrayBuffer transfer requires self.crossOriginIsolated.

You might have not set the [COOP/COEP headers](./quickstart#cross-origin-isolation). If you have, make sure to restart the dev server and then refresh the preview page with a hard refresh (`cmd`+`shift`+`r` on MacOS and `ctrl`+`shift`+`r` on Windows).

:::tip Tip from the community
Solid.js developers added the following snippet to the Vite plugins array to include a plugin that always adds CORS in their Vite-based app:

```js
   {
      name: 'add-cors',

      configureServer(server) {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
          next();
        });
      },
    },
```

For deployment, they used `netlify _headers` file.
:::

## Embedding cross-origin-isolated site

In order to embed a cross-origin-isolated site, make sure that both the embed and embedder have the same COOP/COEP settings. The WebContainer API requires `require-corp` so both need to be set up as `require-corp`. Additionally, add `allow="cross-origin-isolated"` as an attribute on the embedded iframe.

To learn more, check out this [article about COOP/COEP](https://blog.stackblitz.com/posts/cross-browser-with-coop-coep/).

## Running commands in a particular directory

:::tip Tip from the community
To enable running commands in a particular directory, Astro team followed these steps in the setup:

1. Install Astro globally
2. Mount each project in a separate directory
3. Call each project via a package manager

which is reflected in the following code:

```js

webcontainer.spawn('turbo', ['--cwd', `~/projects/${id}`, 'exec', 'astro', 'dev']);

```

:::

## `Out of memory` error

It may happen that having a few StackBlitz projects open at the same time may cause your browser to run out of memory. In your browser's console, you will see the following error:

> RangeError: WebAssembly.instantiate(): Out of memory: wasm memory

When too much memory is allocated to browser processes, browsers will run out of memory. This can happen if you open too many StackBlitz projects at the same time. This includes our editor, Codeflow IDE, and WebContainer API app - or if a page features too many StackBlitz embeds running at the same time.

To free up memory, close other StackBlitz projects in other tabs or windows, and refresh the page.

## `Cannot load native addon` error

Currently, WebContainers can only execute languages that are natively supported on the Web, including JavaScript and WebAssembly. It is not possible to run [native addons](https://nodejs.org/api/addons.html) which are usually implemented using native languages such as C++, unless they can be compiled to WebAssembly. Therefore, loading native addons is disabled by default via [`--no-addons`](https://nodejs.org/api/cli.html#--no-addons) in WebContainers. As a result, you may encounter an error that says:

> `Cannot load native addon because loading addons is disabled`.

The solution to this is to use an alternative to the native addon which is either fully implemented in JavaScript or can be compiled to WebAssembly.

## `Protocol "https:" not supported. Expected "http:"` npm error

In some environments it may be helpful to explicitly set an `.npmrc` with the registry specifed to overcome this. 

An example in your `files,js` add this with <strong>http://</strong>

```js 
".npmrc": {
  file: {
    contents: `registry=http://registry.npmjs.org`
  }
},
```
