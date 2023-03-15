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
    type="podcast"
    :body="body"
    :href="href"
    :imgSrc="imgSrc"
    :title="title"
  />
</template>
