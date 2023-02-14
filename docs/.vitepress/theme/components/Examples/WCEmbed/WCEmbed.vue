<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { useData } from 'vitepress';

import { init } from './webcontainer';

let updateTheme: (isDark: Ref<boolean>) => void;
let disposeDirtyListener: (() => void) | undefined;
let disposeResizeListener: (() => void) | undefined;
let resizeListener: (() => void) | undefined;

const { isDark } = useData();

onMounted(async () => {
  const terminalPanel = document.querySelector(".terminal");
  const editorPanel = document.querySelector(".editor");

  const result = await init(isDark, editorPanel, terminalPanel);

  updateTheme = result.updateTheme;

  const $unsaved = document.querySelector(".unsaved");

  (window as any).run = result.run;

  disposeDirtyListener = result.onDirty((isDirty) => {
    if ($unsaved == null) {
      return;
    }

    const isPristineVisible = $unsaved.classList.contains('pristine');

    if (isDirty && isPristineVisible) {
      $unsaved.classList.remove('pristine');
    } else if (!isDirty && !isPristineVisible) {
      $unsaved.classList.add('pristine');
    }
  });

  const resizeListener = () => {
    result.onResize();
  };

  // resize the terminal properly
  window.addEventListener('resize', resizeListener);

  disposeResizeListener = () => {
    window.removeEventListener('resize', resizeListener);
  };

  updateTheme(isDark);
});

onUnmounted(() => {
  disposeDirtyListener?.();
  disposeResizeListener?.();
});

watch(isDark, () => {
  updateTheme?.(isDark);
});
</script>

<template>
  <div class="playground-wrapper">
  
    <div class="editor-wrapper">
      <div class="editor__heading">
        <p>index.js<span class="unsaved pristine">⬤</span></p>
      </div>
      <div class="editor"></div>
    </div>
    
    <div class="terminal-wrapper">
      <div class="terminal"></div>
    </div>

    <div class="cards">
      <button class="card" onclick="run('node index.js')">
        <span>Run index.js</span>
        <code><span class="code-pink">❯</span> node index.js</code>
      </button>
      <button class="card" onclick="run('ls -l')">
        <span>List files</span>
        <code><span class="code-pink">❯</span> ls -l</code>
      </button>
    </div>
    
  </div>
</template>

<style lang="scss">
@import "xterm/css/xterm.css";
// xterm
.xterm-helpers {
  height: 0;
  opacity: 0;
}

.xterm-viewport {
  background-color: transparent !important;
}

.cm-editor {
  height: 100%;
}

.cm-gutters {
  height: calc(100% - 1px) !important;
  border-radius: 0 !important;
  border-bottom-left-radius: 12px !important;
  border-bottom: solid 1px rgba(196, 208, 217, 0.4) !important;
  background-image: radial-gradient(145% 110% at 46% 20%, #FDFEFF 50%, #F0F5FA 100%, #9abfe1 100%);
  :root.dark & {
    border-bottom: solid 1px rgba(255,255,255,0.2) !important;
    background-image: radial-gradient(145% 110% at 46% 20%, rgba(9, 12, 15, 0.94) 50%, rgba(17, 25, 33, 0.94) 100%, #0D1822 100%);
  }
}

</style>

<style scoped lang="scss">
.playground-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
}

// -----------------
// Hide WebContainer example on mobile Safari
// - these should work for at least v10.1+ and probably v7.1+
_::-webkit-full-page-media, _:future, :root .playground-wrapper {
  @media (max-width: 1024px) {
    display: none;
  }
}

@media not all and (min-resolution:.001dpcm)
{ @supports (-webkit-appearance:none) {
  .playground-wrapper { 
    @media (max-width: 1024px) {
      display: none;
    }
  }
}}
// -----------------

.editor-wrapper {
  position: relative;
  flex: 50%;
  max-height: 100%;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    inset 0 0 0 1px rgba(196, 208, 217, 0.4),
    inset 0 -1px 0 0 rgba(255,255,255,0.1),
    inset 0 1px 0 0 rgba(132, 185, 246, 0.1);
  background-image: radial-gradient(145% 110% at 46% 20%, #FDFEFF 50%, #F0F5FA 85%, #9abfe1 100%);
  backdrop-filter: blur(6px);
  overflow: hidden;
  animation: editorEnter 0.4s ease;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
  visibility: hidden;
  :root.dark & {
    box-shadow:
      inset 0 0 0 1px rgba(193, 228, 255, 0.1),
      inset 0 -1px 0 0 rgba(255,255,255,0.1),
      inset 0 1px 0 0 rgba(132, 185, 246, 0.1);
    background-image: radial-gradient(145% 110% at 46% 20%, rgba(9, 12, 15, 0.5) 33%, rgba(17, 25, 33, 0.8) 85%, #0D1822 100%);
    backdrop-filter: blur(4px);
  }
  @media (max-width: 1024px) {
    display: flex;
    flex: 100%;
  }
}

.editor__heading {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 0 0 rgba(196, 208, 217, 0.4);
  @media (max-width: 1024px) {
    display: none;
  }
  :root.dark & {
    box-shadow: 0 1px 0 0 rgba(255,255,255,0.1);
  }
  p {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 11.5px;
    font-weight: 600;
    text-align: center;
    opacity: 0.8;
    transition: ease 0.1s;
    transition-property: background-color, opacity;
  }
  .unsaved {
    position: absolute;
    top: 0;
    right: calc(50% - 10ch);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5px;
    margin-left: 10px;
    opacity: 0.6;
    transform: none;
    transition: 0.1s ease;
    transition-property: opacity, transform;
  }

  .unsaved.pristine {
    transform: scale(0);
    opacity: 0;
  }
}

.editor {
  position: relative;
  height: 144px;
  max-width: 100%;
  margin-left: 1px;
  z-index: 99;
}

.terminal-wrapper {
  border-radius: 12px;
  padding: 18px 0px 18px 18px;
  box-shadow:
    inset 0 0 0 1px rgba(196, 208, 217, 0.4),
    inset 0 -1px 0 0 rgba(255,255,255,0.1),
    inset 0 1px 0 0 rgba(132, 185, 246, 0.1);
  background-image: radial-gradient(145% 110% at 46% 20%, rgba(250, 253, 255, 0.5) 50%, rgba(228, 238, 246, 0.6) 85%, #9abfe1 100%);
  backdrop-filter: blur(6px);
  animation: editorEnter 0.4s ease;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
  visibility: hidden;
  :root.dark & {
    box-shadow:
      inset 0 0 0 1px rgba(193, 228, 255, 0.1),
      inset 0 -1px 0 0 rgba(255,255,255,0.1),
      inset 0 1px 0 0 rgba(132, 185, 246, 0.1);
    background-image: radial-gradient(145% 110% at 46% 20%, rgba(9, 12, 15, 0.5) 33%, rgba(17, 25, 33, 0.8) 85%, #0D1822 100%);
    backdrop-filter: blur(4px);
  }

  @media (max-width: 1024px) {
    border-left: 1px solid rgba(196, 208, 217, 0.4);
    border-top: 0px;

    :root.dark & {
      border-left-color: rgba(193, 228, 255, 0.1);
    }
  }
}

.terminal {
  position: relative;
  height: 200px;
  font-size: 11px;
  z-index: 99;

  ::-webkit-scrollbar {
    width: 13px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #79797966;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(#646464b3, rgba(121, 121, 121, 0.4));
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: var(#bfbfbf66, rgba(121, 121, 121, 0.5));
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background-color: transparent;
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(196, 208, 217, 0.4);
  background-image: radial-gradient(145% 110% at 46% 20%, rgba(250, 253, 255, 0.5) 50%, rgba(228, 238, 246, 0.6) 85%, #9abfe1 100%);
  backdrop-filter: blur(6px);

  animation: editorEnter 0.4s ease;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
  visibility: hidden;
  :root.dark & {
    box-shadow: inset 0 0 0 1px rgba(193, 228, 255, 0.1);
    background-image: radial-gradient(145% 110% at 46% 20%, rgba(9, 12, 15, 0.5) 33%, rgba(17, 25, 33, 0.8) 85%, #0D1822 100%);
    backdrop-filter: blur(4px);
  }

  @media (max-width: 500px) {
    padding: 0;
    background: none !important;
    box-shadow: none !important;
  }
}

.card {
  flex: 0.5;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 8px;
  width: 100%;
  color: #646f89;
  font-size: 12.5px;
  line-height: 1.72;
  font-weight: 500;
  text-align: left;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.05);
  transition: 0.1s ease;
  transition-property: background-color;
  cursor: pointer;
  :root.dark & {
    color: #b2bbd3;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.6);
    background-color: rgba(22, 24, 29, 0.72);
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }

  code {
    color: #5d6f7e;
    font-family: 'Menlo', monospace;
    font-size: 13px;
    font-weight: 600;
    @media (max-width: 500px) {
      font-size: 12px;
    }
    :root.dark & {
      color: #fff;
    }

    span.code-pink {
      color: #e933d7;
    }
    :root.dark & {
      span.code-pink {
        color: #e34fd5;
      }
    }
  }

}

.card:hover {
  box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
  background-color: #fff;
  :root.dark & {
    background-color: #212327;
  }
}

@keyframes editorEnter {
  0% {
    transform: translateY(48px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
    visibility: visible;
  }
}

</style>