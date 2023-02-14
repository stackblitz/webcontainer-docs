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

**WebContainer API is perfect for interactive coding experiences.** Among its most common use cases are production-grade IDEs, programming tutorials, next-generation documentation, AI applications, or employee onboarding platforms. WebContainers have been [battle-tested by millions of users](#whos-using-webcontainers) of StackBlitz classic editor, Codeflow, the official SvelteKit tutorial, and Cloudflare Wrangler workers, among others.

Ready to try it? Check out this WebContainer API starter in an editor running on... WebContainers as well!

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://webcontainer.new)

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

To explore the API, check out the WebContainer starter:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://webcontainer.new)

## Who's using WebContainers?

Initially [announced at Google I/O](https://blog.stackblitz.com/posts/introducing-webcontainers/), **WebContainers are developed by [StackBlitz](https://stackblitz.com) and have been battle-tested by millions of developers every month in StackBlitz [classic editor](https://node.new) and in the new [Codeflow IDE](https://stackblitz.com/codeflow)**. Externally, WebContainers also power a number of instant coding experiences such as Cloudflare Wrangler's [workers.new](https://blog.cloudflare.com/cloudflare-stackblitz-partnership/#powering-a-better-developer-experience-and-documentation) and the Svelte team's [interactive fullstack tutorial](http://learn.svelte.dev/) for SvelteKit.

To see more examples of how WebContainers have been used so far, check out our [Community Inspirations page](/guides/community-inspirations).

## Get started

To get started:

- check out our [WebContainer starter](https://webcontainer.new)
- follow our [step-by-step tutorial](/tutorial/1-building-your-first-webcontainers-app) and build your first WebContainer app
- reading the [API reference](/api)
- get inspired by our [Community examples](/guides/community-inspirations)

## Community

Wanna ask a question, get some inspiration, or help us amplify your project? Join our [Discord community](https://discord.gg/stackblitz)!