<script setup lang="ts">
import ViteConfLogo from './ViteConfLogo.vue';
import CloseIcon from './Icons/CloseIcon.vue';
import { computed, ref, onMounted } from 'vue';

const href =
  'https://viteconf.org/?utm_campaign=stackblitz-on-page&utm_source=wc&utm_medium=nav-button';

const key = 'shouldShowViteConfTopBanner';

let shouldShowViteConfTopBanner = ref(false);

onMounted(() => {
  shouldShowViteConfTopBanner.value = localStorage.getItem(key) !== 'false';
  if (shouldShowViteConfTopBanner.value) {
    document.querySelector('.Layout')?.classList.add('with-banner');
  }
});

function onCloseClick() {
  localStorage.setItem(key, 'false');

  document.querySelector('.Layout')?.classList.remove('with-banner');
  shouldShowViteConfTopBanner.value = false;
}
</script>

<template>
  <div class="viteconf-banner" :class="[!shouldShowViteConfTopBanner && 'hide']">
    <div class="container">
      <ViteConfLogo class="logo" />
      <span class="text">ViteConf 2023</span>
      <a class="link" :href="href" target="_blank"> Get your free ticket! </a>
    </div>
    <button class="close-button" @click="onCloseClick"><CloseIcon /></button>
  </div>
</template>

<style scoped lang="scss">
.viteconf-banner.hide {
  display: none;
}

.viteconf-banner {
  @media (max-width: 960px) {
    display: none;
  }
  z-index: var(--vp-z-index-nav);
  width: 100%;
  height: 48px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  display: flex;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 48px;
    top: 0;
    left: 0;
    background: radial-gradient(
        58% 296% at 12% 122%,
        hsla(291, 52%, 55%, 1),
        rgba(184, 82, 201, 0) 100%
      ),
      radial-gradient(54% 296% at 38% 78%, hsla(29, 100%, 83%, 1), rgba(255, 211, 170, 0) 100%);
    mix-blend-mode: hard-light;
  }

  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 48px;
    top: 0;
    right: 0;
    background: radial-gradient(
        50% 190% at 90% 100%,
        hsla(291, 52%, 55%, 1),
        hsla(291, 52%, 55%, 0) 100%
      ),
      radial-gradient(52% 250% at 60% 70%, hsla(202, 100%, 77%, 1), hsla(202, 100%, 77%, 0) 100%);
    mix-blend-mode: hard-light;
  }
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.logo {
  margin-inline-end: 17px;
  width: 24px;
  height: 24px;
}

.text {
  margin-inline-end: 32px;
  font-size: 13px;
  font-weight: 800;
}

.link {
  background-color: #000;
  padding: 10px 16px;
  font-size: 11.5px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  border-radius: 6px;
  border: 1px solid hsl(210 98% 53%);
  z-index: 1;
  cursor: pointer;
  &:hover {
    background: hsl(210 98% 53%);
  }

  &:focus-within {
    outline: solid 2px var(--sb-control-border-focus);
    outline-offset: -2px;
  }
}

.close-button {
  position: absolute;
  top: 6px;
  right: 15px;
  z-index: 1;
  padding: 10px;

  > svg {
    fill: #fff;
    width: 10px;
    height: 16px;
  }

  &:hover {
    > svg {
      opacity: 0.5;
    }
  }
}
</style>
