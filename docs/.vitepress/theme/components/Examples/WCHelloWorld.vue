<script lang="ts">
export default {
  data() {
    return {
      focusedStep: null
    }
  },
  methods: {
    updateFocusedStep(step?: number) {
      this.$data.focusedStep = step ? step : null;
    },
  }
}
</script>

<script setup lang="ts">
import ExampleEditor from './ExampleEditor.vue';
import ExampleBrowser from './ExampleBrowser.vue';
</script>

<template>
  <div class="setup-steps-wrapper">

    <div class="setup-steps">
      <ul class="steps-list">
        <li
          @mouseover="updateFocusedStep(1)"
          @mouseleave="updateFocusedStep()"
        >
          <span class="step" />
          <span class="description">Boot a WebContainer.</span>
        </li>
        <li
          @mouseover="updateFocusedStep(2)"
          @mouseleave="updateFocusedStep()"
        >
          <span class="step" />
          <span class="description">Populate the container's file system.</span>
        </li>
        <li
          @mouseover="updateFocusedStep(3)"
          @mouseleave="updateFocusedStep()"
        >
          <span class="step" />
          <span class="description">Programmatically install packages.</span>
        </li>
        <li
          @mouseover="updateFocusedStep(4)"
          @mouseleave="updateFocusedStep()"
        >
          <span class="step" />
          <span class="description">Run your development server in-browser.</span>
        </li>
      </ul>
      <a class="learn-more" href="/tutorial/1-building-your-first-webcontainers-app">
        <span class="icon" />
        <span><strong>Read more</strong> about setting up WebContainer in your web app.</span>
      </a>
    </div>

    <div class="setup-example" aria-hidden="true">
      <div class="webcontainer-example-container" aria-hidden="true">
        <ExampleEditor :focusedStep="focusedStep" />
        <ExampleBrowser />
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import '@theme/styles/vars';

.setup-steps-wrapper {
  position: relative;
  display: flex;
  gap: 84px;
  width: var(--content-max-width);
  max-width: 100%;
  margin: 0 auto 52px;
  padding: 0 52px;
  @media (max-width: 1280px) {
    gap: 64px;
    padding-right: 32px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 1160px) {
    padding: 0 24px;
  }
  @media (max-width: 500px) {
    padding: 0 12px;
  }
}

.setup-steps {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 32px;
  padding: 44px 0;
  @media (max-width: 1024px) {
    padding: 0;
  }
}

.steps-list {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  // gap: 8px;

  .step {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    font-size: 12px;
    font-weight: 700;
    box-shadow: inset 0 0 0 1px rgba(96, 218, 255, 0.2);
    border-radius: 50%;
    background-color: rgba(27, 60, 78, 0.3);
  }
  .description {
    color: #4b565e;
    font-size: 15px;
    font-weight: 500;
    transition: color 0.16s ease;
    :root.dark & {
      color: #b8c1c7;
    }
  }

  li {
    display: flex;
    align-items: center;
    gap: 64px;
    padding: 24px 24px;
    text-align: left;
    border-radius: 16px;
    transition: 0.16s ease;
    transition-property: background-color, background-image, box-shadow, color;
    -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 72%, rgba(0,0,0,0));
            mask-image: linear-gradient(to right, rgba(0,0,0,1) 72%, rgba(0,0,0,0));
    &:hover {
      box-shadow: inset 0 0 0 1px rgba(196, 208, 217, 0.4);
      background-image: radial-gradient(145% 110% at 46% 20%, rgba(250, 253, 255, 0.5) 50%, rgba(228, 238, 246, 0.6) 85%, #9abfe1 100%);
      :root.dark & {
        background-image: radial-gradient(145% 110% at 46% 20%, rgba(9, 12, 15, 0.5) 33%, rgba(17, 25, 33, 0.8) 85%, #0D1822 100%);
      }
      .description {
        color: #252c31;
      }
      :root.dark & {
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
        background-color: rgba(16, 23, 28, 0.6);
        .description {
          color: #fff;
        }
      }
    }

    @media (max-width: 1280px) {
      gap: 32px;
      padding: 24px 16px;
    }
    @media (max-width: 1160px) {
    -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 86%, rgba(0,0,0,0));
            mask-image: linear-gradient(to right, rgba(0,0,0,1) 86%, rgba(0,0,0,0));
    }
    @media (max-width: 1024px) {
      padding: 16px 16px;
      padding-left: 32px;
    }
  }
}

.learn-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  margin-top: 44px;
  padding: 24px 36px;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(196, 208, 217, 0.4);
  background-image: radial-gradient(145% 110% at 46% 32%, rgba(250, 253, 255, 0.5) 50%, rgba(228, 238, 246, 0.6) 85%, #9abfe1 100%);
  transition: 0.16s ease;
  transition-property: background-color, border-color, box-shadow, color, transform;

  @media (max-width: 1024px) {
    margin-top: 0;
    margin-bottom: 52px;
  }

  :root.dark & {
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
    background-image: radial-gradient(145% 110% at 46% 32%, rgba(9, 12, 15, 0.5) 33%, rgba(17, 25, 33, 0.8) 85%, #0D1822 100%);
  }

  &:hover {
    --border-thickness: 1px;
    background-color: #fff;
    box-shadow:
      inset 0 1px 0 0 rgba(255,255,255,0.1),
      inset 0 0 0 var(--border-thickness) var(--vp-c-brand-lighter),
      0 0 24px -10px var(--vp-c-brand-lighter);
    transform: translateY(-2px);
  }

  :root.dark &:hover {
    background-color: transparent;
    box-shadow:
      inset 0 1px 0 0 rgba(255,255,255,0.1),
      inset 0 0 0 var(--border-thickness) var(--vp-c-brand-lighter),
      0 0 24px -10px var(--vp-c-brand-lighter);
  }

  .icon {
    width: 28px;
    height: 28px;
    background-image: linear-gradient(to top, #4ec4de, #d8f8ff);
    -webkit-mask-image: url('/icons/fa-message-arrow-up-right-solid.svg');
            mask-image: url('/icons/fa-message-arrow-up-right-solid.svg');
    -webkit-mask-position: center;
            mask-position: center;
    -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
    -webkit-mask-size: contain;
            mask-size: contain;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    line-height: 1.4;
    strong {
      font-weight: 700;
    }
  }
}

.setup-example {
  position: relative;
  flex: 1;
  @media (max-width: 700px) {
    max-width: 100%;
  }
}

.webcontainer-example-container {
  --editor-width: 492px;
  --editor-height: 312px;
  --browser-offset-top: 56px;
  --browser-offset-left: 140px;
  --browser-offset-bottom: 84px;
  --browser-gap: 10px;
}
</style>
