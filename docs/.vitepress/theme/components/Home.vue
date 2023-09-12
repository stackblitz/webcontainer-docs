<script setup lang="ts">
import CTAButton from '@theme/components/Buttons/CTAButton.vue';
import Footer from '@theme/components/Footer.vue';
import Hero from '@theme/components/Hero/Hero.vue';
import FeaturesCardList from '@theme/components/Features/FeaturesCardList.vue';
import TestimonialCardList from '@theme/components/Testimonials/TestimonialCardList.vue';
import WCUsedBy from '@theme/components/WCUsedByOrgs/WCUsedBy.vue';
import WCHelloWorld from '@theme/components/Examples/WCHelloWorld.vue';
import ProjectsUsingWCCardList from '@theme/components/WCUsedByProjects/ProjectsUsingWCCardList.vue';

defineProps<{
  footerSections: any[];
}>();
</script>

<template>
  <div class="top-section">
    <Hero />
    <h3>Battle-tested by cutting-edge teams</h3>
    <WCUsedBy />
    <TestimonialCardList />
  </div>

  <div class="section">
    <img src="/img/features/elements-01-nodeLIGHT-02-DARK.png" />
    <h2>Power your web app with<br/>the <strong>WebContainer API</strong></h2>
    <p>Create unmatched user experiences by integrating Node.js directly into your web app.<br/>Build fully-branded products without connecting to external servers or directing users away to third-party apps.</p>
    <FeaturesCardList />
  </div>

  <div class="section">
    <h3>Set up in only a few steps</h3>
    <WCHelloWorld />
  </div>

  <div class="section">
    <h3>Build rich development experiences not possible before</h3>
    <ProjectsUsingWCCardList />
  </div>

  <div class="final-section">
    <div class="section">
      <div class="features-small">
        <div class="feature">
          <h2>Support for every team</h2>
          <p>Small startups, open source maintainers, and Fortune 500 enterprises all enjoy access to StackBlitz's committed product support, features and improvements.</p>
        </div>
        <div class="feature">
          <h2>Slash server costs</h2>
          <p>WebContainer API only requires the compute power of your local CPU and browser, eliminating the cost and overhead of managing remote servers.</p>
        </div>
        <div class="feature">
          <h2>Ship faster</h2>
          <p>No additional teams to build or maintain. Leave the technical support to us and focus on actually shipping your product.</p>
        </div>
      </div>
    </div>
  </div>


  <div class="section">
    <h2>Leverage the tech <strong>we use<br/> in our own products.</strong></h2>
    <p>Years of development by our full-time engineering team, front-line feedback from leading community partners, and funded R&amp;D into future technological possibilities make WebContainer more robust by the day.</p>
    <CTAButton href="/guides/quickstart">Get started!</CTAButton>
  </div>
  <Footer :sections="footerSections" />
</template>

<style scoped lang="scss">
@import '@theme/styles/vars.scss';

// for viteconf banner
:root {
  @media (min-width: 960px) {
    --vp-layout-top-height: 30px;
  }
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -72px;
  padding-top: 276px;
  padding-bottom: 64px;
  min-height: 100lvh;
  background-attachment: fixed;
  background-image: url('/img/0001-8-2.jpg');
  background-size: cover;
  background-position: center bottom;
  overflow-x: hidden;

  :root.dark & {
    background-image: url('/img/0001-8-2-dk-bluedk.jpg');
  }

  @media (max-width: 1024px) {
    padding-top: 160px;
  }

  h3 {
    @media (max-width: 10240px) {
      margin-top: 52px;
    }
  }
}

.features-small {
  max-width:var(--content-max-width);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 84px 40px;
  margin: 52px 0;
  padding: 0 52px;
  @media (max-width: 600px) {
    padding: 0;
  }
}

.feature {
  max-width: 30%;
  display: flex;
  flex-direction: column;
  gap: 28px;
  @media (max-width: 1200px) {
    max-width: 416px;
  }
  h2 {
    font-family: Gilroy, var(--vp-font-family-base);
    font-size: 28px;
    line-height: 1.1;
    font-weight: 400;
    color: #000;
    :root.dark & {
      color: #fff;
    }
    strong {
      font-weight: 600;
    }
  }
  p {
    max-width: 416px;
    font-size: 15px;
    line-height: 1.8;
    @media (max-width: 680px) {
      max-width: 84%;
      font-size: 15px;
      line-height: 1.8;
    }
    @media (max-width: 680px) {
      max-width: 100%;
    }
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }
}

.section > h2 {
  margin-bottom: 32px;
  font-family: Gilroy, var(--vp-font-family-base);
  font-size: 52px;
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: #000;
  :root.dark & {
    color: #fff;
  }
  strong {
    font-weight: 600;
  }
  @media (max-width: 680px) {
    margin-bottom: 40px;
    font-size: 34px;
  }
  @media (max-width: 600px) {
    font-size: 30px;
  }
}

.section > p {
  width: 700px;
  max-width: 100%;
  margin-bottom: 52px;
  font-size: 17px;
  line-height: 1.8;
  @media (max-width: 680px) {
    max-width: 84%;
    font-size: 15px;
    line-height: 1.8;
  }
  @media (max-width: 680px) {
    max-width: 100%;
  }
}

h3 {
  margin-bottom: 48px;
  font-family: 'Gilroy', sans-serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 1.2;
  text-align: center;
  color: #000;
  :root.dark & {
    color: #fff;
  }
  @media (max-width: 680px) {
    font-size: 26px;
  }
}

.section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width:var(--content-max-width);
  padding: 0 18px;
  margin: 100px auto 132px;
  text-align: center;
}

.final-section {
  background-attachment: fixed;
  background-image: url('/img/0001-8-2.jpg');
  background-size: cover;
  background-position: center bottom;
  padding: 16px 0;
  :root.dark & {
    background-image: url('/img/0001-8-2-dk-bluedk.jpg');
  }
}

img {
  max-height: 84px;
  margin-block-end: 24px;
  &.light {
    :root.dark & {
      display: none;
    }
  }
  &.dark {
    :root:not(.dark) & {
      display: none;
    }
  }
}

.external-links {
  padding-bottom: 60px;

  :root.dark & {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0) 360px);
  }

  @media (min-width: $bp-medium) {
    padding-top: 20px;
    padding-bottom: 80px;
  }
}
</style>

<!-- global on current page only -->
<style lang="scss">
.VPNavBar .content-body,
.VPNavBar.fill .content-body {
  background-color: transparent !important;
  backdrop-filter: none;
  :root.dark & {
    background-color: transparent !important;
  }
}
.VPNavBar {
  transition: 0.2s ease !important;
  transition-property: background-color, backdrop-filter !important;
}
.VPNavBar.fill {
  transition-property: background-color, backdrop-filter !important;
  backdrop-filter: blur(6px) !important;
  background-color: rgba(255,255,255,0.8) !important;
  :root.dark & {
    background-color: rgba(7, 8, 10, 0.8) !important;
  }
}
.VPContent:not(.has-sidebar) {
  padding-top: 0 !important;
}
</style>
