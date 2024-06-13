---
title: &title VSLite
description: &description A lighweight IDE-like experience with a fresh Node.js environment for you to play with.
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

<PageHeading title="vslite" category="ide" />

A lighweight IDE-like experience with a fresh Node.js environment for you to play with. 

Use terminal and write code using autocomplete-enabled editor:

<Screenshot src="/img/community/vslite.png" alt="vslite" href="https://vslite.dev/" />
