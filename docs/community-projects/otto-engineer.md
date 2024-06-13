---
title: &title Otto Engineer | Community Projects
description: &description The AI sidekick that tests its own code and iterates until it works.
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

<PageHeading title="Otto Engineer" category="ai" />


Otto Engineer is an autonomous agent that takes AI-assisted coding to the next level.

* **Otto checks its work and iterates**: Otto executes its code and tests it to make sure it works. If there are errors, it will keep iterating until the code works 🦾
* **Otto executes its code safely in isolation**: Otto is built on [Web Containers](https://webcontainers.io/guides/introduction), a runtime for executing Node.js and OS commands that runs entirely in the browser, with a virtual, in-memory file system 🤓
* **Otto requires zero setup**: Since it all runs in the browser, you just start a new chat and put Otto to work, watching it run commands and edit code in the embedded terminal and editor 🔥
* **Otto operates in a real environment**: Otto can install and use npm packages, tweak its TS config, and write its own tests. Say goodbye to hallucinated code that doesn't actually work 👋

<Screenshot src="/img/community/otto_engineer.png" alt="AI application" href="https://otto.engineer/" />
