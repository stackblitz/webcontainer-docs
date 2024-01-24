<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import Feedback from './Feedback/Feedback.vue';
import NavBarAuthButtons from './AuthButtons/NavBarAuthButtons.vue';
import NavScreenAuthButtons from './AuthButtons/NavScreenAuthButtons.vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <NavBarAuthButtons />
    </template>
    <!-- <template #layout-top>
      <ViteConfBanner />
    </template> -->

    <template #doc-footer-before>
      <Feedback />
    </template>
    <template #nav-screen-content-after>
      <NavScreenAuthButtons />
    </template>
  </Layout>
</template>
