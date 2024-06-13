---
title: &title pkg-size
description: &description Find the true size of an npm package.
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

<PageHeading title="pkg-size" category="tool" />

<Screenshot src="/img/community/pkg-size.png" alt="pkg-size" href="https://pkg-size.dev/" />

Find the true size of an npm package. 

# Why?

## **For Package Users**

### Get Insights
* **Get insights:** Package dependencies can be deceiving—a package with one direct dependency may actually install 100 indirect dependencies. Find out everything getting installed.

### Install Cost
* **Install cost:** The size of `node_modules` can easily get out of control. Be mindful of what you're installing and keep it in check.

### Bundle Cost
* **Bundle cost:** Importing a large dependency to your web app can easily impact its performance. It can bloat your app, slow-down load time, and increase memory usage. Optimize for ESM packages that are tree-shakeable.

### **For Package Authors**

### Install Speed
* **Install speed:** This is especially important if your package is used by CLI tools that can be loaded with [npx](https://docs.npmjs.com/cli/v8/commands/npx).

### Unideal Environments
* **Unideal environments:** Your package may be downloaded with slow internet, on slow devices, with little storage. It may even be downloaded within the browser via WebContainers.

### Security
* **Security:** Keeping dependencies to a minimum will reduce points of failure: unexpected breaking changes, malicious code, and dependency bloat.

<Screenshot src="/img/community/pkg-size.png" alt="pkg-size" href="https://pkg-size.dev/" />