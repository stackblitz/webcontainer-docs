<script setup lang="ts">
  import CardLink from '@theme/components/Helpers/CardLink.vue';
  defineProps<{
    body?: string;
    href: string;
    imgSrc?: string
    title?: string;
  }>();
</script>

<template>
  <CardLink
    type="article"
    :body="body"
    :href="href"
    :imgSrc="imgSrc"
    :title="title"
  />
</template>
