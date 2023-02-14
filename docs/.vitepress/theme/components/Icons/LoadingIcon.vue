<script setup lang="ts">
defineProps<{
  className?: string;
  hidden?: boolean;
  size?: number;
}>();
</script>

<template>
  <span
    :class="['root', className]"
    :aria-hidden="hidden"
    :style="{ '--size': `clamp(8px, ${size || 18}px, 100px)` }"
  ></span>
</template>

<style scoped lang="scss">
.root {
  // Base styles should make the BlitzLoading component take up space,
  // to avoid layout jumps, but be otherwise transparent
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  flex: none;
  width: var(--size);
  height: var(--size);
  border: solid 2px transparent;
  border-radius: 50%;
  color: inherit;

  &[aria-hidden='true'] {
    visibility: hidden;
  }

  // Only paint and animate the element if not hidden
  // (invisible animated elements can cause perf issues in some browsers)
  &:not([aria-hidden='true']) {
    border-top-color: currentColor;
    border-left-color: currentColor;
    // Original speed was 200ms but that's a bit frantic, the half circle almost becomes
    // a full circle at this speed. Something in the 300-400 range feels better.
    // Looking at other spinners, they tend to be slower still (600ms?), but have a more
    // detailed visual style.
    animation: spin 350ms linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
