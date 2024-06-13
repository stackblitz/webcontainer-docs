---
title: &title clack.cc
description: &description Build your own custom CLI with a set of feature-rich components.
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

<PageHeading title="clack" category="tool" />

Building interactive command line applications doesn't have to be so hard. `@clack/core` provides unstyled, feature-rich components designed to be a strong foundation for your custom CLIs.

Of course, sometimes you just want to use something well-designed. That's why `@clack/prompts` comes out-of-the-box with beautiful prompts and a straightforward API.

<Screenshot src="/img/community/clack.png" alt="clack" href="https://www.clack.cc/" />
