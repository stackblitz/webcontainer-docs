<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import Feedback from './Feedback/Feedback.vue';
const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <Feedback />
    </template>
  </Layout>
</template>
