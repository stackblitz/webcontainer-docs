<script setup lang="ts">
import CardSingle from '@theme/components/CardLists/CardSingle.vue';
import type { Person } from '@theme/data/people';

defineProps<{
  attribution: Person;
}>();
</script>

<template>
  <div class="attribution-link">
    <CardSingle :href="attribution.href" size="small">
      <div class="content-body">
        <div v-if="attribution.imgPath" class="avatar"
          :style="{ backgroundImage: attribution.imgPath && `url('${attribution.imgPath}` }"
        />
        <span class="name">{{ attribution.name }}</span>
      </div>
    </CardSingle>
  </div>
</template>

<style scoped lang="scss">
.content-body {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 3px 14px;
  padding-right: 14px;
  transition: ease 0.1s background-color;
  :root:not(.dark) & {
    background-color: var(--vp-c-bg-soft);
  }
}

.avatar {
  width: 20px;
  height: 20px;
  margin-left: -6px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.8);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.name {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  transition: ease 0.1s color;
}


.attribution-link {
  padding: 1px;
}
.attribution-link:hover {
  .content-body {
    :root:not(.dark) & {
      background-color: transparent;
    }
    :root.dark & {
      background-color: var(--vp-c-bg-soft);
    }
  }
  .name {
    color: var(--vp-c-text-1);
  }
}
</style>
