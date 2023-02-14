---
layout: page
title: WebContainers - Dev environments. In your web app.
head:
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/webcontainer_api.png'}]

hero:
  name: WebContainers
  text: Dev environments. In your web app.
  tagline: Build the future of web based coding experiences, from interactive tutorials to instant production-ready dev environments.
#   image:
#     src: /logo.png
#     alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /guides/quickstart
    - theme: alt
      text: View on GitHub
      link: https://github.com/stackblitz/webcontainer-core
---

<script setup lang="ts">
import Home from '@theme/components/Home.vue';

import { homeExternalLinks, footerSections } from './data';
</script>

<Home
  :externalLinks="homeExternalLinks"
  :footerSections="footerSections"
/>