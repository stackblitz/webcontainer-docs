---
title: &title builder.io playground
description: &description Explore builder.io's visual editor fully in the browser.
outline: [2, 3]
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-community_inspirations.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
<script setup lang="ts">
import PageHeading from '@theme/components/Helpers/CommunityProjectPageHeading.vue';
import Screenshot from '@theme/components/Helpers/Screenshot.vue';
</script>

<PageHeading title="builder.io playground" category="ide" />

Explore builder.io's visual editor fully in the browser

<Screenshot src="/img/community/builder-io-playground.png" alt="Angular Tutorial" href="https://angular.dev/tutorials/learn-angular" />
