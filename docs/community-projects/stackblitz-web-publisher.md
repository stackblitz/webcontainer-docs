---
title: &title StackBlitz Web Publisher | Community Projects
description: &description A low-code publishing tool that makes editing docs or blogs pleasant, built with WebContainer API.
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
import PodcastLink from '@theme/components/Helpers/PodcastLink.vue';
import RepositoryLink from '@theme/components/Helpers/RepositoryLink.vue';
import VideoLink from '@theme/components/Helpers/VideoLink.vue';
import AttributionLinks from '@theme/components/Helpers/AttributionLinks.vue';
import { people } from '@theme/data/people';
const { SYLWIA_VARGAS } = people;
</script>

<PageHeading title="StackBlitz Web Publisher" category="lowCode" />

A publishing tool that makes editing docs or blogs pleasant thanks to a realtime preview of the changes. In fact, you can try it yourself by [editing this page](https://stackblitz.com/~/github.com/stackblitz/webcontainer-docs/edit/main/docs/community-projects/web-publisher.md?initialPath=%2Fcommunity-projects%2Fweb-publisher)!

<Screenshot src="/img/community/web_publisher.png" alt="Web Publisher" href="https://stackblitz.com/~/github.com/stackblitz/webcontainer-docs/edit/main/docs/community-projects/web-publisher.md?initialPath=%2Fcommunity-projects%2Fweb-publisher" />

<VideoLink
  imgSrc="/img/community/web_publisher_talk.png"
  title="Web Publisher at Next.js Conf 2022"
  body="Watch this talk from Next.js Conf 2022 by Sylwia Vargas, a Developer Advocate at StackBlitz, about making your docs editing experience easier."
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>
<AttributionLinks :attributions="[SYLWIA_VARGAS]" />

<PodcastLink
  body="Simple podcast link."
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>

<PodcastLink
  title="Simple podcast link."
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>

<PodcastLink
  title="Simple podcast link."
  body="Simple podcast link."
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>

<PodcastLink
  imgSrc="/img/community/web_publisher_talk.png"
  title="Simple podcast link."
  body="Simple podcast link. More text and more of the text."
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>

<RepositoryLink
  body="stackblitz/web-publisher"
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>

<RepositoryLink
  title="stackblitz/web-publisher"
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>

<RepositoryLink
  title="Simple repository link."
  body="Simple repository link."
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>

<RepositoryLink
  imgSrc="/img/community/web_publisher_talk.png"
  title="Simple repository link."
  body="Simple repository link. More text and more of the text."
  href="https://youtube.com/watch?v=B4rqK-o1QZw"
/>
