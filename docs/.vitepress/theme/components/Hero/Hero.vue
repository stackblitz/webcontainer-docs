<script setup lang="ts">
import CTAButton from '@theme/components/Buttons/CTAButton.vue';
import WCEmbed from '@theme/components/Examples/WCEmbed/WCEmbed.vue';
</script>

<template>
  <header>
    <div class="header-content">
      <h1><strong>Dev environments.</strong><br/>In your <strong>web app.</strong></h1>
      <p>From interactive tutorials to full-blown IDEs, build instant, interactive coding experiences backed by WebContainers: the trusted, browser-based runtime from <a href="https://stackblitz.com" target="_blank">StackBlitz</a>.</p>
      <div class="cta-buttons">
        <CTAButton href="/guides/introduction">Get started</CTAButton>
        <CTAButton href="https://docs.google.com/forms/d/e/1FAIpQLSertiZLl-za0ZHxsWbd2IrISVft2OpPglykEHpEllPSfnZIUg/viewform" layout="simple">Book a demo</CTAButton>
      </div>
    </div>

    <div class="header-media">
      <WCEmbed />
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@theme/styles/vars';

header {
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
  @media (max-width: 500px) {
    padding: 0 12px;
  }
}

.header-content {
  flex: 1.2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
  font-size: 76px;
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
  max-width: 600px;
  margin: 0.75em 0 1.5em;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
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
  gap: 16px;
  width: 100%;
  @media (max-width: 1024px) {
    justify-content: center;
  }
}
</style>
