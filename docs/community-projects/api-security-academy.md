---
title: &title API Security Academy | Community Projects
description: &description An interactive learning platform focusd on GraphQL security.
outline: [2, 3]
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-community_inspirations.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
<script setup lang="ts">
import PageHeading from '@theme/components/Helpers/CommunityProjectPageHeading.vue';
import RepositoryLink from '@theme/components/Helpers/RepositoryLink.vue';
import Screenshot from '@theme/components/Helpers/Screenshot.vue';
</script>

<PageHeading title="API Security Academy" category="tutorial" />

The API Security Academy is a new interactive learning platform focused on mastering GraphQL security. Developed by one of [Escape](https://escape.tech)'s engineers, it's built for all levels of expertise, from a beginner to an experienced developer.

Each WebContainer contains a live GraphQL application, so learners will not only understand why a vulnerability is risky, but also how to exploit it and, most importantly, how to fix it.

And it’s free, interactive, and open-source! The goal is to improve collaboration and engagement in the GraphQL community!

<Screenshot src="/img/community/api_security_academy.png" alt="API Security Academy application" href="https://escape.tech/academy/" />

<RepositoryLink
  title="Escape-Technologies/graphql-security-academy"
  href="https://github.com/Escape-Technologies/graphql-security-academy"
/>