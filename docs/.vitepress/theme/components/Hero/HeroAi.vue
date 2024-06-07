<script setup lang="ts">
import CTAButton from '@theme/components/Buttons/CTAButton.vue';
import WCEmbed from '@theme/components/Examples/WCEmbed/WCEmbed.vue';
</script>

<template>
  <header>

    <div class="header-content">
      <h1><strong>In-Browser Code Execution</strong> for <strong>AI</strong></h1>
      <p>Execute, interpret, and refactor AI-generated code directly in the browser:<br/>a secure, sandboxed environment with zero latency, zero compute costs, and zero virtual machines.</p>
      <div class="cta-buttons">
        <CTAButton href="/guides/introduction">Get started</CTAButton>
        <CTAButton href="https://forms.default.com/360757" layout="simple">Book a demo</CTAButton>
      </div>
    </div>

    <div class="header-img">
      <img src="/img/ai/wc_api-ai.png" />
    </div>

  </header>
</template>

<style scoped lang="scss">
@import '@theme/styles/vars';

header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  @media (max-width: 500px) {
    padding: 0 12px;
  }
}

.header-content {
  flex: 1.2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  @media (max-width: 1024px) {
    align-items: center;
  }
}

.header-media {
  transform: translateY(-80px);
  max-height: 600px;
  max-width: 596px;
  width: 100%;
  @media (max-width: 1460px) {
    width: 44%;
  }
  @media (max-width: 1280px) {
    width: 48%;
  }
  @media (max-width: 1024px) {
    width: 100%;
    transform: translateY(0);
  }
}

$icon-mask: linear-gradient(to bottom, #fff9 10%, #fffa 30%, #fff0 74%);

header .icon {
  width: 160px;
  height: 160px;
  color: var(--sb-foreground-highlight);
  -webkit-mask-image: $icon-mask;
  mask-image: $icon-mask;

  @media (prefers-contrast: more) {
    display: none;
  }

  @media (min-width: $bp-medium) {
    width: 200px;
    height: 200px;
  }
}

header h1 {
  margin-bottom: 0;
  font-family: Gilroy, var(--vp-font-family-base);
  line-height: 1.2;
  font-weight: 400;
  margin-top: -25px;
  font-size: 68px;
  letter-spacing: -2px;
  line-height: 1;
  color: #000;
  :root.dark & {
    color: #fff;
  }

  strong {
    font-weight: 600;
  }

  @media (max-width: 1400px) {
    font-size: 68px;
  }
  @media (max-width: 1280px) {
    font-size: 60px;
  }
  @media (max-width: 1024px) {
    text-align: center;
  }
  @media (max-width: 960px) {
    margin-top: -15px;
    font-size: 40px;
  }
}

header p {
  max-width: 700px;
  margin: 0.75em 0 1.5em;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
  @media (max-width: 1280px) {
    font-size: 16px;
  }
  @media (max-width: 1024px) {
    margin-bottom: 12px;
    text-align: center;
  }
  @media (max-width: 960px) {
    font-size: 16px;
  }
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  @media (max-width: 1024px) {
    justify-content: center;
  }
}

.header-img {
  max-width: 780px;
  img {
    width: 100%;
  }
}
</style>
