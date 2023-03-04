---
title: &title StackBlitz Codeflow | Community Projects
description: &description Full-featured version of the desktop Visual Studio Code IDE built with WebContainer API.
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
import ArticleLink from '@theme/components/Helpers/ArticleLink.vue';
import VideoLink from '@theme/components/Helpers/VideoLink.vue';
</script>

<PageHeading title="StackBlitz Codeflow" category="ide" />

[Codeflow IDE](https://developers.stackblitz.com/codeflow) is a full-featured version of the desktop Visual Studio Code IDE supporting git commands, desktop extensions and a Node.js development server with terminal. This entire docs site was built entirely in [Codeflow IDE](https://developers.stackblitz.com/codeflow).

<Screenshot src="/img/community/codeflow.png" alt="Codeflow IDE" href="https://developers.stackblitz.com/codeflow" />

<VideoLink
  imgSrc="/img/community/eric_simons_talk.png"
  title="Codeflow announcement at ViteConf 2022"
  body="Watch the Keynote from Eric Simons, CEO of StackBlitz, announcing Codeflow at ViteConf 2022"
  href="https://www.youtube.com/watch?v=Ea1zJD5uQRg"
/>
<!-- Here's a Keynote from [Eric Simons](https://twitter.com/ericsimons40), the CEO of StackBlitz, [announcing Codeflow](https://www.youtube.com/watch?v=Ea1zJD5uQR) at ViteConf 2022: -->

<ArticleLink
  imgSrc="/img/community/codeflow-stackblitz-figma.jpg"
  title="StackBlitz Launches Codeflow and Announces Figma Investment"
  body="Read more about StackBlitz and Codeflow in this Newstack article"
  href="https://thenewstack.io/stackblitz-launches-codeflow-and-announces-figma-investment/"
/>