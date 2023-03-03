---
title: &title schachnovelle | Community Projects
description: &description A command line chess game written in Node.js., built with WebContainer API.
outline: [2, 3]
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-community_inspirations.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
<script setup lang="ts">
import PageHeading from '@theme/components/CommunityProjects/CommunityProjectPageHeading.vue';
import Screenshot from '@theme/components/CommunityProjects/CommunityProjectScreenshot.vue';
</script>

<PageHeading title="schachnovelle" category="game" />

A command line chess game written in Node.js. [Explore it yourself!](https://gitlab.com/manegame/schachnovelle)

<Screenshot src="/img/community/chess.png" alt="Command line chess game" href="https://www.npmjs.com/package/schachnovelle" />

As [Manus Nijhoff](https://manusnijhoff.nl/), the author of this chess game, puts it, “If you've got nothing better to do than waste time in the terminal, StackBlitz is there with you!”
