<script setup lang="ts">
import { useData }from 'vitepress';
import CardSingle from '@theme/components/CardLists/CardSingle.vue';
import type { FeaturesCardData } from '@theme/data/home';
const { isDark } = useData();
defineProps<{ feature: FeaturesCardData }>();
</script>

<template>
  <CardSingle>
    <div class="feature-card" :style="{backgroundImage: `url(${isDark ? feature.bgImgDark : feature.bgImgLight})`}">
      <h4>{{ feature.title }}</h4>
      <p v-html="feature.description" />
    </div>
  </CardSingle>
</template>

<style scoped lang="scss">
.feature-card {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 28px 28px;
  padding-top: 220px;
  text-align: left;
  background-position: center 4px;
  background-repeat: no-repeat;
  background-size: contain;
  @media (max-width: 1100px) {
    padding-top: 280px;
  }
  @media (max-width: 900px) {
    padding-top: 220px;
  }

  h4 {
    font-weight: 600;
    font-size: 15px;
    line-height: 1.2;
  }

  p {
    font-size: 14px;
    opacity: 0.8;
    line-height: 1.6;
  }
}
</style>