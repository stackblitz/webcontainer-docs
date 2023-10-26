---
title: &title Changelog
description: &description Changelog for the WebContainers API library
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]

---

# Changelog

## 1.1.8

* Add [`fs.watch`](api#▸-watch).

## 1.1.7

* Change compile target to ES2022

## 1.1.6

* Add [`fs.rename`](api#▸-rename).
* After a WebContainer instance has been [`torn down`](api#▸-teardown) you can [`boot`](api#▸-boot) it again.

## 1.1.5

* Show warning with invalid `coep` settings

## 1.1.4

* Add `'none'` to the list of accepted values for `coep` setting. This value can only work on Chromium-based browsers as long as an Origin Trial is supported.

## 1.1.3

> No changes were made

## 1.1.2

* Fix ESM support for `@webcontainer/api` by changing all imports to include the `.js` extension.

## 1.1.0

* The value of the [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) header can be changed now with `BootOptions#coep`.
* The name of the working directory can be specified through `BootOptions#workdirName`.
* The default value of the `PATH` environment variable is exposed in `WebContainer#path`.
* The full path of the working directory is exposed in `WebContainer#workdir`.
