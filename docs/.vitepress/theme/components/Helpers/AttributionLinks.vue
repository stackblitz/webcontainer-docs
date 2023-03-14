<script setup lang="ts">
  import type { Person } from '@theme/data/people';
  import AttributionLink from '@theme/components/Helpers/AttributionLink.vue';

  defineProps<{
    attributions: Person[];
  }>();
</script>

<template>
  <div class="attribution-links">
    <span class="title">In this post: </span>
    <AttributionLink v-for="a of attributions" :attribution="a" />
  </div>
</template>

<style scoped lang="scss">
.attribution-links {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 36px 0;
}

.title {
  margin-right: 2px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 600;
}
</style>
<style lang="scss">
.card-link + .attribution-links {
  margin-top: -20px;
}
</style>
