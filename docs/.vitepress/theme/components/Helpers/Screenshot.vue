<script setup lang="ts">
  defineProps<{
    src: string;
    alt: string;
    href?: string;
  }>();
</script>

<template>
  <div class="screenshot">
    <a v-if="href" :href="href" target="_blank" rel="nofollow">
      <img :src="src" :alt="alt" />
    </a>
    <img v-else :src="src" :alt="alt" />
  </div>
</template>

<style scoped lang="scss">
.screenshot {
  width: 100%;
  max-width: 760px;
  margin: 36px 0 52px;
  border-radius: 8px;
  overflow: hidden;
  :root:not(.dark) & {
    border: solid 1px rgba(0,0,0,0.05);
  }
  a,
  & > img {
    max-width: min(100%, 800px);
    margin: 0 !important;
  }
  @media screen and (max-height: 768px) {
    max-width: 680px;
    max-height: 352px;
  }
  @media screen and (max-width: 960px) {
    max-width: 680px;
    max-height: 352px;
  }
}
</style>
