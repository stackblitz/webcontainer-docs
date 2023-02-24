<script setup lang="ts">
import { onMounted } from 'vue';
import { communityProjects } from '../../../../data';
import Card from '@theme/components/CardLists/Card.vue';
// const { isDark } = useData();
// defineProps<{ feature: FeaturesCardData }>();
onMounted(() => {
  console.log('communityProjects: ', communityProjects);
})
</script>

<template>
  <div class="community-projects">
    
    <div v-for="project of communityProjects" class="project-item">
      <Card>
        <div class="item-content">
          <template v-for="(description, i) in project.descriptionItems">

            <div v-if="i === 0" class="item-description">
              <img v-if="description.thumbnailUrl" :src="description.thumbnailUrl" />
              <div class="description-content">
                <div class="description-heading">
                  <span class="project-title">{{ project.title }}</span>
                  <span class="project-category">{{ project.category }}</span>
                </div>
                <p v-html="description.content" />
              </div>
            </div>

            <a v-else-if="description.itemUrl" class="item-description secondary" :href="description.itemUrl">
              <img v-if="description.thumbnailUrl" :src="description.thumbnailUrl" />
              <span v-html="description.content" />
            </a>

            <div v-else class="item-description secondary">
              <img v-if="description.thumbnailUrl" :src="description.thumbnailUrl" />
              <p v-html="description.content" />
            </div>

          </template>        
        </div>
      </Card>
    </div>

  </div>
</template>

<style scoped lang="scss">
.community-projects {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-item {
  border-radius: 16px;
  overflow: hidden;
  :root:not(.dark) & {
    background-color: rgba(236, 236, 244, 0.32);
  }
}

.item-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  // padding: 12px;
}

.item-description {
  display: flex;
  gap: 8px;
  img {
    width: 252px;
    margin: 12px;
    border-radius: 6px;
    :root:not(.dark) & {
      box-shadow: 0 1px 2px 0 rgba(196, 208, 217, 0.6);
    }
  }
  &.secondary {
    box-shadow:  0 -1px 0 0 rgba(196, 208, 217, 0.4);
    :root.dark & {
      box-shadow: 0 -1px 0 0 rgba(193, 228, 255, 0.1);
    }
    img {
      max-width: 92px;
    }
  }
}

a.item-description.secondary {
  align-items: center;
  gap: 20px;
  padding: 8px 12px;
  color: var(--vp-c-text-2);
  font-size: 13px !important;
  line-height: 1.6;
  transition: 0.1s ease;
  transition-property: background-color, color;
  &:hover {
    color: var(--vp-c-text-1);
    background-color: rgba(236, 240, 244, 0.4);
    :root.dark & {
      background-color: rgba(185, 222, 255, 0.02);
    }
  }
}

.description-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px 24px;

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