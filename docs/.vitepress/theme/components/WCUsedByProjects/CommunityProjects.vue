<script setup lang="ts">
// const { isDark } = useData();
// defineProps<{ feature: FeaturesCardData }>();
import { onMounted } from 'vue';
import { communityProjectCardData } from '../../../../data';
import Card from '@theme/components/CardLists/Card.vue';
onMounted(() => {
  console.log('communityProjectCardData: ', communityProjectCardData);
})
</script>

<template>
  <div class="community-projects">
    <a v-for="project of communityProjectCardData" class="project-item" :href="project.itemUrl">
      <Card>
        <div class="item-content">
          <img :src="project.thumbnailUrl" />

          <div class="item-description">
            <div class="description-heading">
              <span class="project-title">{{ project.title }}</span>
              <span class="project-category">{{ project.category }}</span>
            </div>
            <p v-html="project.description" />
          </div>

        </div>
      </Card>
    </a>
  </div>
</template>

<style scoped lang="scss">
.community-projects {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.card {
  backdrop-filter: none;
  :root.dark & {
    backdrop-filter: none;
  }
}

.project-item {
  align-self: flex-start;
  color: var(--vp-c-text-1);
  border-radius: 16px;
  overflow: hidden;
  transition: 0.14s ease;
  transition-property: background-color, box-shadow, color, transform;
  cursor: pointer;
  :root:not(.dark) & {
    &:not(:hover) {
      background-color: rgba(236, 236, 244, 0.32);
    }
  }
  &:hover {
    color: #000;
    box-shadow: 0 14px 36px -24px rgba(0,40,100,0.24);
    background-color: rgba(236, 236, 244, 0.2);
    transform: translateY(-3px);
    :root.dark & {
      color: #fff;
      background-color: rgba(185, 222, 255, 0.06);
    }
  }
}

.item-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  img {
    max-height: 214px;
    object-fit: cover;
    object-position: center 0;
    // width: auto;
    margin: 0;
    border-radius: 8px;
    :root:not(.dark) & {
      box-shadow: 0 1px 2px 0 rgba(196, 208, 217, 0.6);
    }
  }
}

.item-description {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 20px 16px;
  p,
  a {
    margin: 0;
    color: var(--vp-c-text-2);
    font-size: 13px;
    line-height: 1.6;
  }
}

.description-heading {
  display: flex;
  gap: 24px;
  justify-content: space-between;
  align-items: flex-end;
}

.project-title {
  font-size: 16px;
  font-weight: 600;
}

.project-category {
  font-size: 12.5px;
  font-weight: 600;
  padding: 2px 18px;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
  transform: translateY(-2px);
}
</style>