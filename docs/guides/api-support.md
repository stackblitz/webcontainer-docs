---
title: &title API Versioning and Support
description: &description The WebContainer API has a deprecation policy.
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-api_support.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---

# API Versioning and Support

_Last Updated: January 2024_

**TL;DR**: if there is ever a major change in the underlying runtime, applications _might_ need to upgrade their version of `@webcontainer/api`.

The WebContainer API is comprised to two different components. One is the "client library" at `@webcontainer/api`, an NPM package that these docs discuss in detail. However, there is a second, implicit component that is invisible to consumers of the former: the actual implementation of the runtime, hosted on [StackBlitz](https://stackblitz.com).

A good way to think about this split is to consider the difference between a REST API and the client library used to access it. That is, the difference between the [GitHub API](https://docs.github.com/en/rest) and [Octokit](https://github.com/octokit), between [AWS](https://aws.amazon.com/)  and the [AWS SDK](https://aws.amazon.com/sdk-for-javascript/), etc. The versioning of these client libraries is generally straightforward, as they tend to use semantic versioning. The versioning of the underlying REST API or service is however _decoupled_ from the library: it is instead a matter of support policies.

The `@webcontainer/api` library does, of course, follow semantic versioning. On the other hand, the underlying "engine" API is not explicitly exposed. **We currently do not have any plans for a future version**: should that happen, it would mean that only certain versions of the client library would target the newer runtime. Moreover, we do not have any plans to _retire_ the existing version: that would mean that older versions of the client library would cease to work. If we ever consider doing that, we will have an ample deprecation phase.
