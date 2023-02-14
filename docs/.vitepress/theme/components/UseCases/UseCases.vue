<template>
  <div class="use-cases">
    <div class="use-case">
      <img src="/img/Group131.svg" />
      <h4>Interactive AI Interfaces</h4>
      <p>WebContainer API can connect to external APIs, like ChatGPT. A fullstack UI connecting these tools could enable a new level of user/AI-powered interaction.</p>
    </div>
    <div class="use-case">
      <h4>Education, Training and Testing</h4>
      <p>White-label your own code editor and simplify the barrier to entry for new students, or build powerful, sharable, skill-testing environments.</p>
    </div>
    <div class="use-case">
      <h4>Offload Compute</h4>
      <p>Tasks previously requiring remote servers to run Node.js, can use the local compute of a user's own machine, creating new paradigms of web app patterns and capabilities.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@theme/styles/vars.scss';

.use-cases {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 52px 0;
}

.use-case {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  padding: 240px 36px 36px;
  text-align: left;
  border-radius: 12px;
  // box-shadow:
  //   inset 0 0 0 1px rgba(196, 208, 217, 0.4),
  //   inset 0 -1px 0 0 rgba(255,255,255,0.4),
  //   inset 0 1px 0 0 rgba(132, 185, 246, 0.4);
  // background-color: rgba(255,255,255,0.32);
  backdrop-filter: blur(6px);
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: scale(1.2);
    // background-image: radial-gradient(64.64% 73.02% at 100% -7.49%, rgba(255, 0, 229, 0.2) 21.83%, rgba(126, 0, 129, 0) 100%), radial-gradient(41.29% 50.27% at 18.78% -4.9%, rgba(241, 0, 87, 0.2) 23.44%, rgba(179, 0, 64, 0) 100%), radial-gradient(93.78% 111.46% at 19.65% 112.53%, rgba(168, 0, 151, 0.2) 0%, rgba(96, 0, 86, 0) 100%), radial-gradient(160.99% 101.36% at 21.27% -1.36%, rgba(105, 19, 50, 0.2) 0%, rgba(90, 0, 33, 0.2) 46.42%, rgba(85, 0, 61, 0.18434) 71.35%, rgba(61, 0, 77, 0.108) 100%);
    // background-image: radial-gradient(250% 72% at 50% 100%, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(64% 72% at 100% -8%, rgba(255, 0, 229, 0.2) 6%, rgba(126, 0, 129, 0) 100%), radial-gradient(60% 60% at 18% -8%, rgba(241, 0, 87, 0.2) 0%, rgba(179, 0, 64, 0) 100%), radial-gradient(94% 112% at 20% 112%, rgba(168, 0, 151, 0.2) 0%, rgba(96, 0, 86, 0) 100%), radial-gradient(160% 100% at 22% -2%, rgba(105, 19, 50, 0.2) 0%, rgba(90, 0, 33, 0.2) 46%, rgba(85, 0, 61, 0.18434) 72%, rgba(61, 0, 77, 0.108) 100%);
    background-image: radial-gradient(250% 72% at 50% 100%, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(64% 72% at 100% -8%, rgba(255, 0, 229, 0.2) 6%, rgba(126, 0, 129, 0) 100%), radial-gradient(60% 60% at 18% -8%, rgba(241, 0, 87, 0.2) 0%, rgba(179, 0, 64, 0) 100%), radial-gradient(94% 112% at 20% 112%, rgba(168, 0, 151, 0.2) 0%, rgba(96, 0, 86, 0) 100%),;
    mix-blend-mode: overlay;
  }
  &:nth-child(2)::after {
    background-image: radial-gradient(250% 72% at 50% 100%, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(64% 72% at 100% -8%, rgba(0, 255, 123, 0.2) 6%, rgba(0, 129, 65, 0) 100%), radial-gradient(60% 60% at 18% -8%, rgba(0, 241, 145, 0.3) 0%, rgba(0, 179, 98, 0) 100%), radial-gradient(94% 112% at 20% 112%, rgba(0, 168, 92, 0.355) 0%, rgba(96, 53, 0, 0) 100%),;
  }
  &:nth-child(3)::after {
    background-image: radial-gradient(250% 72% at 50% 100%, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(64% 72% at 100% -8%, rgba(0, 213, 255, 0.2) 6%, rgba(0, 110, 129, 0) 100%), radial-gradient(60% 60% at 18% -8%, rgba(0, 181, 241, 0.3) 0%, rgba(0, 143, 179, 0) 100%), radial-gradient(94% 112% at 20% 112%, rgba(0, 168, 168, 0.355) 0%, rgba(0, 75, 96, 0) 100%),;
  }
  :root.dark & {
    box-shadow:
      inset 0 0 0 1px rgba(193, 228, 255, 0.1),
      inset 0 -1px 0 0 rgba(255,255,255,0.1),
      inset 0 1px 0 0 rgba(132, 185, 246, 0.1);
    background-color: transparent;
    backdrop-filter: blur(6px);
  }

  img {
    position: absolute;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    max-height: 180px;
  }

  h4 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.2;
    mix-blend-mode: overlay;
  }

  p {
    font-size: 14px;
  }
}
</style>