<script setup lang="ts">
  import Card from '@theme/components/CardLists/Card.vue';
  defineProps<{
    title?: string;
    body: string;
    href: string;
    imgSrc: string
  }>();
</script>

<template>
  <div class="community-project-article-link">
    <Card :href="href" target="_blank">
      <div class="card-body" :class="imgSrc && 'has-bg'">
        <div class="icon" :style="imgSrc && {backgroundImage: `url('${imgSrc}`}" :class="imgSrc && 'has-bg'"/>
        <div class="content">
          <span v-if="title" class="title">{{ title }}</span>
          <span class="body" :class="!title && 'no-title'">{{ body }}</span>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.community-project-article-link {
  display: flex;
  margin: 32px 0;
}
.card-body {
  position: relative;
  display: flex;
  flex: 0;
  align-items: center;
  gap: 28px;
  &:not(.has-bg) {
    gap: 0;
  }
}

.icon {
  position: relative;
  display: flex;
  min-width: 152px;
  width: 152px;
  height: 92px;
  margin: 8px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  :root.dark &.has-bg {
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.4);
  }
  &:not(.has-bg)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--vp-c-text-3);
    -webkit-mask-image: url('/icons/fa-newspaper-regular.svg');
            mask-image: url('/icons/fa-newspaper-regular.svg');
    -webkit-mask-position: center;
            mask-position: center;
    -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
    -webkit-mask-size: 40px;
            mask-size: 40px;
  }
  @media screen and (max-width: 500px) {
    // position: absolute;
    display: none;
  }
}
.content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 24px 48px 24px 0;
  color: var(--vp-c-text-1);
  @media screen and (max-width: 500px) {
    padding: 24px;
  }
  @media screen and (max-width: 400px) {
    padding: 20px;
  }
}
.title {
  margin-top: 2px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.24;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
}
.body {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  transition: color 0.14s ease;
  &:not(.no-title) {
    color: var(--vp-c-text-2);
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
}
.card-body:hover .body {
  color: var(--vp-c-text-1);
}
</style>
