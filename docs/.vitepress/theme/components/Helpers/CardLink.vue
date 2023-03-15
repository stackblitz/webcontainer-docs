<script setup lang="ts">
  import CardSingle from '@theme/components/CardLists/CardSingle.vue';
  import type { CardLinkType } from '@theme/data/community-projects';

  defineProps<{
    body?: string;
    href: string;
    imgSrc?: string
    title?: string;
    type?: CardLinkType;
  }>();
</script>
<script lang="ts">
export default {
  data() {
    return {
      iconImg: this.getIconImgFromType(this.type)
    }
  },
  methods: {
    getIconImgFromType(type: CardLinkType | undefined) {
      if (!type) return undefined;
      const imgUrls: {[icon in CardLinkType]: string} = {
        article: '/icons/fa-newspaper-regular.svg',
        podcast: '/icons/fa-podcast-solid.svg',
        repositoryGithub: '/icons/fa-github.svg',
        video: '/icons/fa-youtube.svg'
      }
      return `url('${imgUrls[type]}')`;
    }
  }
}
</script>

<template>
  <div class="card-link">
    <CardSingle :href="href" target="_blank">
      <div class="card-body" :class="imgSrc && 'has-bg'">
        <div
          class="icon"
          :class="
            imgSrc && 'has-bg',
            (!imgSrc && (!title || !body)) && 'small',
            type === 'video' && 'is-video',
            (type === 'podcast') && 'is-podcast',
            (type === 'repositoryGithub') && 'is-repositoryGithub'
          "
          :style="{
            '--icon-img': iconImg,
            backgroundImage: imgSrc && `url('${imgSrc}`,
          }"
        />
        <div class="content" :class="(type === 'podcast' || type === 'repositoryGithub') && 'is-small'">
          <span v-if="title" class="title" :class="!body && 'solo'">{{ title }}</span>
          <span class="body" :class="!title && 'no-title'">{{ body }}</span>
        </div>
      </div>
    </CardSingle>
  </div>
</template>

<style scoped lang="scss">
.card-link {
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
  --icon-img: v-bind(iconImg);
  position: relative;
  display: flex;
  min-width: 100px;
  width: 100px;
  height: 92px;
  margin: 8px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  :root.dark &.has-bg {
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.4);
  }
  
  &.has-bg {
    min-width: 152px;
    width: 152px;
  }

  &.small {
    width: 100px;
    min-width: 100px;
    height: 64px;
    &:not(.has-bg)::before {
      -webkit-mask-size: 32px;
              mask-size: 32px;
    }
  }

  &:not(.has-bg)::before,
  &.has-bg.is-podcast::before,
  &.has-bg.is-repositoryGithub::before,
  &.has-bg.is-video::before {
    --icon-mask-size: 32px;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color 0.14s ease;
    background-color: var(--vp-c-text-3);
    -webkit-mask-image: var(--icon-img);
            mask-image: var(--icon-img);
    -webkit-mask-position: center;
            mask-position: center;
    -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
    -webkit-mask-size: var(--icon-mask-size);
            mask-size: var(--icon-mask-size);
    .card-body:hover & {
      background-color: var(--vp-c-text-2);
    }
  }
  &.has-bg.is-podcast::before,
  &.has-bg.is-repositoryGithub::before,
  &.has-bg.is-video::before {
    --icon-mask-size: 44px;
    background-color: rgba(255,255,255,0.9);
    z-index: 99;
    .card-body:hover & {
      background-color: #fff;
    }
  }

  &.is-podcast:not(.has-bg),
  &.is-repositoryGithub:not(.has-bg) {
    width: 84px;
    min-width: 84px;
    height: 48px;
    &::before {
      -webkit-mask-size: 28px;
              mask-size: 28px;
    }
  }
  &.is-podcast.small,
  &.is-repositoryGithub.small {
    width: 64px;
    min-width: 64px;
    height: 48px;
    &::before {
      -webkit-mask-size: 24px;
      mask-size: 24px;
    }
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 550px;
  padding: 24px 48px 24px 0;
  color: var(--vp-c-text-1);
  &.is-small {
    padding: 16px 48px 16px 0;
  }

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
  &.solo {
    margin-top: 6px;
  }
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
