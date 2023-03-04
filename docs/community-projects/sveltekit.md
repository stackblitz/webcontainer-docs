---
title: &title SvelteKit | Community Projects
description: &description A full educational experience of learning Svelte in the browser, built with WebContainer API.
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
import VideoLink from '@theme/components/Helpers/VideoLink.vue';
</script>

<PageHeading title="SvelteKit" category="tutorial" />

A full educational experience of learning Svelte in the browser. [Try it yourself!](https://learn.svelte.dev/tutorial/welcome-to-svelte)

<Screenshot src="/img/svelte-screen-light.png" alt="SvelteKit Tutorial" href="https://learn.svelte.dev/tutorial/welcome-to-svelte" />

<VideoLink
  imgSrc="/img/community/rich_harris_talk.png"
  title="Curious why Svelte decided to go full-in with WebContainers?"
  body="Hear Rich Harris explain it in his talk Fullstack Documentation delivered at JSNation 2022."
  href="https://www.youtube.com/watch?v=RwBolXX9Pis&t=578s"
/>
<!-- Are you curious why Svelte decided to go full-in with WebContainers? Hear [Rich Harris](https://twitter.com/Rich_Harris) explain it in his talk ["Fullstack Documentation"](https://www.youtube.com/watch?v=RwBolXX9Pis&t=578s) delivered at JSNation 2022: -->
