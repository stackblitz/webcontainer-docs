<script setup lang="ts">
  import { wcUsedBy } from '@theme/data/home';
  import { useData }from 'vitepress';
  const { isDark } = useData();
</script>

<template>
  <div class="used_by">
    <ClientOnly>
      <img
      v-for="company of wcUsedBy"
      :src="isDark ? company.imgDark : company.imgLight"
      :alt="`${company.name} logo`"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.used_by {
  display: flex;
  justify-content: center;
  gap: 92px;
  width: 1000px;
  max-width: 100%;
  margin: 0 auto 92px;
  text-align: center;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 36px 64px;
    padding: 0 52px;
  }
  @media (max-width: 680px) {
    padding: 0 24px;
  }
}

img {
  height: 32px;
  max-width: 134px;
}
</style>
