---
title: &title Introduction
description: &description WebContainer API is a browser-based runtime for executing Node.js applications and operating system commands. It enables you to build applications that previously required a server running.
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-introduction.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
# Introduction

**WebContainers are a browser-based runtime for executing Node.js applications and operating system commands, entirely inside your browser tab.** Apps that previously required cloud VMs to execute user code, in WebContainers can run entirely client-side with [a number of benefits over the legacy cloud VM](#webcontainers-versus-cloud-vm-approach).

**WebContainer API is perfect for interactive coding experiences.** Among its most common use cases are AI applications, adding in-browser code execution to your existing product, programming tutorials, next-generation documentation, browser based IDEs, and employee onboarding platforms. WebContainers have been [battle-tested by millions of users](#who-s-using-webcontainers) of StackBlitz, and inside the interactive learning environments built by the [Svelte](https://learn.svelte.dev/tutorial/welcome-to-svelte), [Angular](https://angular.dev/tutorials/first-app), and [Nuxt](https://learn-dev.nuxt.com/) teams among others.


:::tip Ready to try it out for yourself?
Check out this [WebContainer API starter](https://webcontainer.new/) or see [our Quickstart guide](./quickstart) to get familiar with what's possible!
:::

## Key features

- **Native Node.js inside the browser** running Node.js toolchains (for example, Webpack, Vite, and others)
- **Flexible**: build next-generation coding experiences powered by WebContainers
- **Unmatched security**: everything is contained in a browser tab
- **Fast**: spinning up the entire dev environment in milliseconds
- **Always free for Open Source**: you're the future of the web and we love you 💙

## WebContainers versus cloud VM approach

WebContainers enables you to build applications that previously required running VMs in the cloud to execute user code. Instead, WebContainers run entirely client-side, providing a number of benefits over the legacy cloud VM approach:

- **Unmatched user experience.** No latency. Faster than localhost. Works offline.
- **Cost effective.** Compute is done locally. No paying by the minute for cloud VMs.
- **Scales to millions.** Leverages modern CDN caching and client-side compute.
- **No risk of bad actors.** Say goodbyte to bitcoin miners, malware, and phishing sites.

If you want to skip [the Quickstart guide](./quickstart) and jump straight into exploring the API, you can open the WebContainer starter project in StackBlitz here:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://webcontainer.new)

## Who's using WebContainers?

Initially [announced at Google I/O](https://blog.stackblitz.com/posts/introducing-webcontainers/), **WebContainers are developed by [StackBlitz](https://stackblitz.com) and have been battle-tested by millions of developers every month as they power the StackBlitz editor**. Externally, WebContainers also power a number of popular interactive learning environments including those built by the [Svelte](https://learn.svelte.dev/tutorial/welcome-to-svelte), [Angular](https://angular.dev/tutorials/first-app), and [Nuxt](https://learn-dev.nuxt.com/) teams.

To see more examples of how WebContainers have been used so far, check out our [Community Projects page](/community-projects/all-projects).

## Get started

To get started:

- check out our [WebContainer starter](https://webcontainer.new)
- follow our [step-by-step tutorial](/tutorial/1-build-your-first-webcontainer-app) and build your first WebContainer app
- reading the [API reference](/api)
- get inspired by our [Community projects](/community-projects/all-projects)

## Community

Wanna ask a question, get some inspiration, or help us amplify your project? Join our [Discord community](https://discord.gg/stackblitz)!
