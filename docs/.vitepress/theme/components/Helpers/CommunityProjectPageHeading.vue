<script setup lang="ts">
import { communityProjectCategories as categories } from '@theme/data/community-projects';
import type { CommunityProjectCategory } from '@theme/data/community-projects';

defineProps<{
  title: string;
  category: CommunityProjectCategory;
  showAnchor?: boolean;
}>();
</script>
<script lang="ts">
export default {
  data() {
    return {
      // kebab-case anchor id from project title
      anchorId: this.title
        .replace(/[^a-zA-Z0-9 -]/gi, '')
        .split(' ')
        .map(word => word.toLowerCase())
        .join('-')
    }
  },
}
</script>

<template>
  <div class="community-project-page-heading">

    <a class="mock-breadcrumbs" href="/community-projects/all-projects">Community Projects /</a>

    <h1 :id="anchorId">
      <a v-if="showAnchor" :href="`#${anchorId}`" class="header-anchor" aria-hidden="true">#</a>
      <a class="heading-title">{{ title }}</a>
      <span class="project-category" :style="{'--category-rgb': categories[category].rgb}">{{ categories[category].title }}</span>
    </h1>

</div>
</template>

<style scoped lang="scss">
.community-project-page-heading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  
  h1 {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 8px;
  }
}

.mock-breadcrumbs {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  transition-duration: 0.1s;
  transition-timing-function: ease;
  &:hover {
    color: var(--vp-c-text-1);
  }
}

.heading-title,
.heading-title:hover {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.project-category {
  --category-color-opacity: 0.6;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0;
  white-space: nowrap;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(var(--category-rgb), var(--category-color-opacity));
  transform: translateY(1px);
  transition: 0.1s ease box-shadow;
}
</style>
