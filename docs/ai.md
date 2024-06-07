---
layout: page
title: &title In-browser code execution for AI
description: &description Execute, interpret, and refactor AI-generated code directly in the browser, a secure, sandboxed environment with zero latency, zero compute costs, and zero virtual machines.
head:
  - ['meta', { property: 'og:title', content: *title }]
  - [
      'meta',
      { property: 'og:image', content: 'https://webcontainers.io/img/og/ai.png' },
    ]
  - ['meta', { name: 'twitter:title', content: *title }]
  - ['meta', { name: 'twitter:description', content: *description }]
---

<script setup lang="ts">
import AiPage from '@theme/components/Ai.vue';
import { footerSections } from '@theme/data/links';
</script>

<AiPage :footerSections="footerSections" />
