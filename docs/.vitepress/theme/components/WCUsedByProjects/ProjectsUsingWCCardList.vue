<script setup lang="ts">
import { projectsUsingWCCardData } from '../../../../data';
import CardSingleList from '@theme/components/CardLists/CardList.vue';
import ProjectsUsingWCCard from './ProjectsUsingWCCard.vue';
</script>

<template>
  <div class="list-container">
    <CardList :columns="3">
      <ProjectsUsingWCCard
        v-for="(project, i) of projectsUsingWCCardData"
        :key="i"
        :project="project"
      />
    </CardList>
  </div>
</template>

<style lang="scss" scoped>
.list-container {
  flex: 1;
  width: 100%;
}
</style>