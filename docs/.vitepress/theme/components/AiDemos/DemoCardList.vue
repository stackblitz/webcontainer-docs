<script setup lang="ts">
import CardList from '@theme/components/CardLists/CardList.vue';
import CardSingle from '@theme/components/CardLists/CardSingle.vue';
import { data as demos } from '@theme/data/ai-demos.data';
</script>

<template>
  <div class="list-container">
    <CardList :columns="3">
      <a v-for="demo in demos" :key="demo.url" :href="demo.url" class="demo-link">
        <CardSingle link>
          <div class="demo-card">
            <h4>{{ demo.title }}</h4>
            <p v-if="demo.description">{{ demo.description }}</p>
            <span class="cta">View demo &rarr;</span>
          </div>
        </CardSingle>
      </a>
    </CardList>
  </div>
</template>

<style lang="scss" scoped>
.list-container {
  width: 100%;
}

.demo-link {
  display: flex;
  color: inherit;
  text-decoration: none;
  transition: transform 0.14s ease;
  &:hover {
    transform: translateY(-3px);
  }
  > * {
    flex: 1;
  }
}

.demo-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 28px;
  text-align: left;

  h4 {
    font-family: Gilroy, var(--vp-font-family-base);
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    color: #000;
    :root.dark & {
      color: #fff;
    }
  }

  p {
    flex: 1;
    font-size: 14px;
    line-height: 1.6;
    opacity: 0.8;
  }

  .cta {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--vp-c-brand);
  }
}
</style>
