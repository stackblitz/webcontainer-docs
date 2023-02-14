<script setup lang="ts">
import type { ProjectsUsingWCCardData } from '../../../../data';
import Card from '@theme/components/CardLists/Card.vue';
defineProps<{ project: ProjectsUsingWCCardData }>();
</script>

<template>
  <!-- <Card :url="project.url"> -->
  <Card>
    <div class="project-card">
      <div class="project-img dark" :style="{backgroundImage: `url('${project.imgPath.dark}')`}" />
      <div class="project-img light" :style="{backgroundImage: `url('${project.imgPath.light}')`}" />
      <div class="project-content">
        <p class="title">{{ project.title }}</p>
        <p class="description">{{ project.description }}</p>
        <a class="project-link" :href="project.url" target="_blank" rel="nofollow">{{ project.urlTitle }}</a>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.project-card {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px;
  @media (max-width: 840px) {
    padding: 16px;
  }
}

.project-img {
  display: none;
  width: 100%;
  height: 232px;
  border-radius: 8px;
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  &.dark {
    :root.dark & {
      display: block;
    }
  }
  &.light {
    :root:not(.dark) & {
      display: block;
    }
  }
}

.project-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: 36px 12px 12px;
  text-align: left;

}

.description {
  font-size: 15px;
  :root & {
    opacity: 0.8;
  }
}

.title {
  // display: inline-block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  :root.dark & {
    color: #fff;
  }
  // &:hover {
  //   // color: #fff;
  //   text-decoration: underline;
  //   text-underline-offset: 2px;
  // }
}

.project-link {
  font-size: 14px;
  font-weight: 600;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }

}
</style>