---
title: &title Stylelint Playgound
description: &description A live playground where you can experiment with styleling rulesets using various packages.
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

<PageHeading title="Stylelint Playground" category="ide" />


With Stylelint playground you can experiment with rulesets defined in different npm packages by specifying them in package.json! 

They are actually being installed – just as they would in your project

<Screenshot src="/img/community/stylelint-playground.png" alt="Stylelint Playground" href="https://chimerical-trifle-8d3c21.netlify.app/" />
