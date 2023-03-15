<script setup lang="ts">
  import type { Person } from '@theme/data/people';
  defineProps<{
    quote?: string;
    author: Person;
  }>();
</script>

<template>
  <blockquote>
    <span v-if="!quote" class="quote"><slot /></span>
    <span v-if="quote" class="quote">{{ quote }}</span>
    <a class="author" :href="author.href" target="_blank" rel="nofollow">
      <div v-if="author.imgPath" class="author__avatar"
        :style="{ backgroundImage: author.imgPath && `url('${author.imgPath}` }"
      />
      <span class="author__name">{{ author.name }}</span>
      <span v-if="author.title" class="author__title">{{ author.title }}</span>
    </a>
  </blockquote>
</template>

<style scoped lang="scss">
blockquote {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin: 64px 0;
  padding: 16px 32px;
  @media screen and (max-width: 600px) {
    padding: 16px 24px;
    padding-right: 0;
  }
}
.quote {
  max-width: 600px;
  font-size: 16px;
  font-weight: 500;
  &::before,
  &::after {
    content: '"';
  }
  &::before {
    position: absolute;
    margin-left: -8px;
  }
}

.author {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 16px;
  color: var(--vp-c-text-1);
  transition: none;
  @media screen and (max-width: 600px) {
    gap: 4px 16px;
  }
}

.author__avatar {
  align-self: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.8);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.author__name {
  font-size: 14px;
  font-weight: 600;
  .author:hover & {
    text-decoration: underline;
  }
}

.author__title {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
}
</style>