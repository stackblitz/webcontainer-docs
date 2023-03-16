---
title: &title Tech Educator's Toolkit | Community Projects
description: &description An early exploration of a new way to write interactive tutorials, built with WebContainer API.
outline: [2, 3]
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-community_inspirations.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
<script setup lang="ts">
import PageHeading from '@theme/components/Helpers/CommunityProjectPageHeading.vue';
import VideoLink from '@theme/components/Helpers/VideoLink.vue';
import AttributionLinks from '@theme/components/Helpers/AttributionLinks.vue';
import { people } from '@theme/data/people';
const { DAN_JUTAN } = people;
</script>

<PageHeading title="Tech Educator's Toolkit" category="tutorial" />

Tech Educator's Toolkit is an early exploration of WebContainer API and of a new way to write interactive tutorials.

<VideoLink
  imgSrc="/img/community/dan_jutan_talk.png"
  title="Tech Educator's Toolkit - ViteConf 2022"
  body="Watch this talk from Dan Jutan from ViteConf 2022 to see it in action."
  href="https://www.youtube.com/watch?v=R-1y3Ti3ng4"
/>
<AttributionLinks :attributions="[DAN_JUTAN]" />
