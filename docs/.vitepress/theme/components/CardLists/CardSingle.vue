<script setup lang="ts">
  defineProps<{
    href?: string;
    size?: 'small';
  }>();
</script>

<template>
  <a v-if="href" :href="href" class="card link" :class="size === 'small' && 'small'" target="_blank" rel="nofollow">
    <slot />
  </a>
  <div class="card" v-else>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  box-shadow: 
    inset 0 0 0 1px rgba(196, 208, 217, 0.4),
    inset 0 -1px 0 0 rgba(255,255,255,0.1),
    inset 0 1px 0 0 rgba(132, 185, 246, 0.1),
    0 0 0 0 transparent;
  background-color: rgba(255,255,255,0.32);
  backdrop-filter: blur(6px);
  transition-duration: 0.1s;
  overflow: hidden;
  :root.dark & {
    box-shadow:
      inset 0 0 0 1px rgba(193, 228, 255, 0.1);
    background-color: rgba(185, 222, 255, 0.04);
    backdrop-filter: blur(6px);
  }
}

 .card.link {
  background-color: rgba(236, 236, 244, 0.32);
  transition: 0.14s ease;
  transition-property: background-color, box-shadow, color, transform;
  cursor: pointer;
  &:hover {
    color: #000;
    box-shadow: 
      inset 0 0 0 1px rgba(196, 208, 217, 0.4),
      inset 0 -1px 0 0 rgba(255,255,255,0.1),
      inset 0 0 0 0 transparent,
      0 14px 36px -24px rgba(0,40,100,0.24);
    background-color: rgba(236, 236, 244, 0.2);
    transform: translateY(-3px);
    :root.dark & {
      color: #fff;
      box-shadow:
        inset 0 0 0 1px rgba(193, 228, 255, 0.12);
      background-color: rgba(185, 222, 255, 0.06);
    }
  }
  &.small:hover {
    transform: none;
  }
}
</style>