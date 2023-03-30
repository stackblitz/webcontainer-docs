---
title: &title Changelog
description: &description Changelog for the WebContainers API library
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]

---

# Changelog

## 1.1.0

* The value of the [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) header
  can be changed now with `BootOptions#coep`.
* The name of the working directory can be specified through `BootOptions#workdirName`.
* The default value of the `PATH` environment variable is exposed in `WebContainer#path`.
* The full path of the working directory is exposed in `WebContainer#workdir`.
