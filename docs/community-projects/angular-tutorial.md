---
title: &title Angular Tutorial
description: &description The official Angular Tutorial at angular.dev.
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

<PageHeading title="Angular Tutorial" category="tutorial" />

This interactive tutorial will teach you the basic building blocks to start building great apps with Angular.

You'll need to have basic familiarity with HTML, CSS and JavaScript to understand Angular.

Each step represents a concept in Angular. You can do one, or all of them.

If you get stuck, click "Reveal answer" at the top.

<Screenshot src="/img/community/angular-tutorial.png" alt="Angular Tutorial" href="https://angular.dev/tutorials/learn-angular" />
