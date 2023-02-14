<script setup lang="ts">
defineProps<{ value: 'yes' | 'no' | 'star' | 'star-half'; label: string }>();
</script>

<!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
<template>
  <svg
    v-if="value === 'yes'"
    class="icon positive"
    viewBox="0 0 512 512"
    role="img"
    :aria-label="label"
  >
    <title>{{ label }}</title>
    <path
      d="M471 105c12 13 12 33 0 46L215 407a32 32 0 0 1-46 0L41 279a32 32 0 0 1 46-46l105 106 233-234c13-12 33-12 46 0Z"
    />
  </svg>
  <svg
    v-if="value === 'no'"
    class="icon negative"
    viewBox="0 0 512 512"
    role="img"
    :aria-label="label"
  >
    <title>{{ label }}</title>
    <path
      d="M425 137a36 36 0 0 0-51-50L256 205 137 87a36 36 0 0 0-50 51l118 118L87 375a36 36 0 0 0 51 50l118-118 119 118a36 36 0 0 0 50-51L307 256l118-119Z"
    />
  </svg>
  <svg
    v-if="value === 'star'"
    class="icon positive"
    viewBox="0 0 512 512"
    role="img"
    :aria-label="label"
  >
    <path
      d="M282 40a29 29 0 0 0-52 0l-59 120-130 19a29 29 0 0 0-16 50l94 93-22 133a29 29 0 0 0 42 30l117-62 117 62a29 29 0 0 0 42-30l-22-133 94-93a29 29 0 0 0-16-50l-130-19-59-120Z"
    />
  </svg>
  <svg
    v-if="value === 'star-half'"
    class="icon positive"
    viewBox="0 0 512 512"
    role="img"
    :aria-label="label"
  >
    <path
      d="m256 365 24 13 77 42-15-89-4-26 19-19 64-63-88-13-26-4-12-24-39-80v263Zm159 90a29 29 0 0 1-42 30l-117-62-117 62a29 29 0 0 1-42-30l22-133-94-93a29 29 0 0 1 16-50l130-19 59-120a29 29 0 0 1 52 0l59 120 130 19a29 29 0 0 1 16 50l-94 93 22 133Z"
    />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-inline-end: 4px;
  vertical-align: -5px;
  fill: currentColor;
}

.negative {
  color: hsl(340 100% 45%);
}

.positive {
  color: hsl(155 65% 38%);
}

:root.dark {
  .negative {
    color: hsl(340 100% 55%);
  }
  .positive {
    color: hsl(155 65% 55%);
  }
}
</style>
