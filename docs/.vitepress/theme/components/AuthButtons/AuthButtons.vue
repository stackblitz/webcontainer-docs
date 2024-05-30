<script setup lang="ts">
defineProps<{ place: 'navScreen' | 'navBar' }>();
</script>

<template>
  <div :class="place === 'navScreen' ? 'navScreenContainer' : 'navBarContainer'">
    <a href="https://forms.default.com/360757" class="link accent">Book a demo</a>
  </div>
</template>

<style scoped lang="scss">
@import './linkStyles.scss';

/**
 * When we have enough space, we show auth buttons in nav bar.
 * When we don't, we show them inside the hamburger menu.
 */
.navBarContainer {
  margin-inline-start: 40px;
  display: flex;
  gap: 8px;
  // this is when we hide top nav menu
  @media screen and (max-width: 768px) {
    margin-inline-start: 0px;
  }
  @media screen and (max-width: 580px) {
    display: none;
  }

}

.navScreenContainer {
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    gap: 8px;
    margin-block-start: 24px;
  }

  .link {
    flex: 1;
    justify-content: center;
    height: 40px;
  }
}
</style>
