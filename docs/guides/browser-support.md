---
title: &title WebContainers Browser Support
description: &description For WebContainers, we support desktop Chromium-based browsers out of the box, and Firefox in alpha state.
head:
  - ['meta', {property: 'og:title', content: *title}] 
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-browser_support.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---

# {{ $frontmatter.title }}

_Last update: February 2023_

**TL;DR** For WebContainers, we support desktop Chromium-based browsers out of the box, and Firefox in alpha state. If you have issues with supported browsers, [check your browser configuration](./browser-config).

:::warning Note
There is a reported Chrome regression on Macbooks with M1 chip, which also affects the speed of some larger projects on WebContainers. Learn more about this issue in these bug reports: [issue 1228686](https://bugs.chromium.org/p/chromium/issues/detail?id=1228686) and [issue 1356099](https://bugs.chromium.org/p/chromium/issues/detail?id=1356099).
:::

## Web Platform requirements

StackBlitz requires some of the latest additions to the Web Platform to work correctly when running WebContainers-based projects. Most important among them are **[`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)** and **[cross-origin isolation](https://developer.mozilla.org/en-US/docs/Web/API/crossOriginIsolated)**.

`SharedArrayBuffer`s (SABs) allow simultaneous access to a chunk of memory from multiple different workers. This is a powerful feature that was [disabled temporarily](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements) in light of potential security issues. Cross-origin isolation is the key to enabling SABs: by properly configuring some of the headers and controlling which resources are served to browsers, a site can be considered `crossOriginIsolated` or, in other words, secure enough to use SABs. Both features are enabled in Chromium-based browsers (Chrome, Brave, Edge) and Firefox.

However, for cross-origin isolation to work for our use case, you need to be able to embed arbitrary resources: to be able to write and test your web application seamlessly, regardless of which images or scripts you choose to include. For this to work, a [new mode](https://github.com/WICG/credentiallessness) of cross-origin isolation that allows this is needed.

Unfortunately, this feature is only enabled in Chromium-based browsers. We are following current specifications and continuing our talks with browser implementors to bring support to other browsers as soon as possible.

You can read more about [cross-origin isolation on our blog](https://blog.stackblitz.com/posts/cross-browser-with-coop-coep/).

## Runtime differences

Note that there might be minor differences in the behavior of WebContainers in browsers that are not based on Chromium. After all, WebContainers strive for maximum compatibility with Node.js, which itself is based on [V8](https://v8.dev/), Chromium's own JavaScript engine. Node.js very much relies on some specific features of V8, which are not part of the established JavaScript standards. Because of that, it is easier to achieve a higher degree of compatibility in a Chromium-based browser, which _also_ runs on top of V8.

## Chrome

WebContainers are fully supported in Chrome and most Chromium-based browsers including Brave, Edge, Vivaldi, and others.

However, if you enabled blocking third-party cookies in Chrome preferences, this may prevent WebContainers from working out of the box.

If you think you’re running into this issue, check out [how to configure Chrome to run WebContainers](./browser-config#chrome-service-workers).

:::warning Note
There is a reported Chrome regression on Macbooks with M1 chip, which also affects the speed of some larger projects on WebContainers. Learn more about this issue in these bug reports: [issue 1228686](https://bugs.chromium.org/p/chromium/issues/detail?id=1228686) and [issue 1356099](https://bugs.chromium.org/p/chromium/issues/detail?id=1356099).
:::

## Brave

Brave is a Chromium-based browser and supports WebContainers well but it ships with a more aggressive third-party blocking by default which tends to stop WebContainers from running.

Learn [how to configure Brave to run WebContainers](./browser-config#brave-service-workers).

## Firefox

We have alpha support for Firefox. Please try it and [share feedback with us](https://github.com/stackblitz/webcontainer-core/issues/new/choose)!

As mentioned above, Firefox does not fully support the required mode for cross-origin isolation, so you might encounter limitations when **running a server in a preview window** within the StackBlitz editor. Third-party assets might get blocked due to the limitations of cross-origin isolation policies. However, you can work around this by opening your server preview in a separate window.

In addition to this, there might be [other runtime incompatibilities](#runtime-differences) as detailed above.

## Safari

Safari recently shipped support for `SharedArrayBuffer` and cross-origin isolation in a somewhat [buggy state](https://bugs.webkit.org/show_bug.cgi?id=238442). In addition to this, it is still lacking a few other features which prevents us from shipping a working environment such as:

* [Atomics.waitAsync](https://github.com/tc39/proposal-atomics-wait-async)
* [Lookbehind in regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/guides/Regular_Expressions/Assertions)

Note that none of above can be pollyfilled.
