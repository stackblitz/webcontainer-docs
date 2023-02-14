<template>
  <div class="browser" aria-hidden="true">
    <div class="browser__heading">
      <div class="browser__heading__os-buttons" />
      <div class="browser__heading__search-bar">
        <div class="browser__heading__search-bar__icons" />
      </div>
    </div>
    <div class="browser__content">
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@theme/styles/vars';

.browser {
  --example-browser-icon-color: rgb(207, 218, 224);
  :root.dark & {
    --example-browser-icon-color: rgb(43, 52, 57);
  }
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: var(--browser-gap);
  z-index: -1;
  width: 644px;
  height: calc(var(--editor-height) + var(--browser-offset-top) + var(--browser-offset-bottom));
  top: calc(var(--browser-offset-top) * -1);
  left: calc(var(--editor-width) - var(--browser-offset-left));
  padding: var(--browser-gap);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  box-shadow:
    inset 0 0 0 1px rgba(190, 209, 224, 0.3),
    inset 0 -1px 0 0 rgba(226, 244, 255, 0.1),
    inset 0 1px 0 0 rgba(132, 185, 246, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.4);
  background-image: radial-gradient(40% 150% at 33% 3%, rgba(244, 251, 255, 0.4) 0%, rgba(203, 211, 222, 0.1) 82%);
  :root.dark & {
    box-shadow:
      inset 0 0 0 1px rgba(193, 228, 255, 0.1),
      inset 0 -1px 0 0 rgba(226, 244, 255, 0.1),
      inset 0 1px 0 0 rgba(132, 185, 246, 0.1);
    background-image: radial-gradient(40% 150% at 33% 3%, rgba(41, 64, 79, 0.2) 0%, rgba(23, 26, 30, 0.2) 82%);
  }
}

.browser__heading {
  width: 100%;
  display: flex;
  height: 28px;
  gap: 20px;
}

.browser__heading__os-buttons {
  width: 52px;
  -webkit-mask-image: url('/img/components/ExampleBrowser/example-browser-os_buttons.svg');
          mask-image: url('/img/components/ExampleBrowser/example-browser-os_buttons.svg');
  -webkit-mask-position: 10px center;
          mask-position: 10px center;
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  background-color: var(--example-browser-icon-color);
}

.browser__heading__search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(196, 208, 217, 0.4);
  background-color: rgba(255, 255, 255, 0.4);
  :root.dark & {
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.8);
    background-color: rgba(4, 6, 8, 0.4);
  }
}

.browser__heading__search-bar__icons {
  width: 72px;
  height: 12px;
  -webkit-mask-image: url('/img/components/ExampleBrowser/example-browser-search_bar_icons.svg');
          mask-image: url('/img/components/ExampleBrowser/example-browser-search_bar_icons.svg');
  -webkit-mask-position: 10px center;
          mask-position: 10px center;
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  -webkit-mask-size: 60px;
          mask-size: 60px;
  background-color: var(--example-browser-icon-color);
}

.browser__content {
  flex: 1;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(196, 208, 217, 0.4);
  background-color: rgba(255, 255, 255, 0.4);
  :root.dark & {
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.9);
    background-color: rgba(4, 6, 8, 0.4);
  }
}
</style>
