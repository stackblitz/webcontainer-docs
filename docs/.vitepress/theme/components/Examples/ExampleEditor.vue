<script lang="ts">
export default {
  props: {
    focusedStep: null,
  },
  data() {
    return {
      isWCFileVisible: true
    }
  },
  methods: {
    toggleIsWCFileVisible() {
      this.isWCFileVisible = !this.isWCFileVisible;
    }
  }
}
</script>

<template>
  <div class="editor" aria-hidden="true">
    <div class="editor__heading">
      <p :class="{selected: isWCFileVisible}" @click="!isWCFileVisible && toggleIsWCFileVisible()">hello-world.ts</p>
      <p :class="{selected: !isWCFileVisible}" @click="isWCFileVisible && toggleIsWCFileVisible()">project-files.ts</p>
    </div>

    <div class="editor__content" v-if="isWCFileVisible">
      <pre>
<code><span :class="`step-group ${focusedStep ? 'disabled' : ''}`" id="step-root-0"><span class="code-blue">import</span> { WebContainer, FileSystemTree } <span class="code-blue">from</span> <span class="code-orange">'@webcontainer/api'</span><span class="code-grey">;</span>
<span class="code-blue">import</span> { projectFiles } <span class="code-blue">from</span> <span class="code-orange">'./project-files.ts'</span><span class="code-grey">;</span>

<span class="code-blue">async</span> <span class="code-blue">function</span> main() {</span>
  <span :class="`step-group ${focusedStep ? 'disabled' : ''} ${focusedStep === 1 ? 'focused' : ''}`" id="step-1"><span class="code-comment">// First we boot a WebContainer</span>
  <span class="code-blue">const</span> webcontainer <span class="code-grey">=</span> <span class="code-pink">await</span> WebContainer.boot()<span class="code-grey">;</span></span>
  
  <span :class="`step-group ${focusedStep ? 'disabled' : ''} ${focusedStep === 2 ? 'focused' : ''}`" id="step-2"><span class="code-comment">// After booting the container we copy all of our project files
  // into the container's file system</span>
  <span class="code-pink">await</span> webcontainer.mount(projectFiles)<span class="code-grey">;</span></span>
    
  <span :class="`step-group ${focusedStep ? 'disabled' : ''} ${focusedStep === 3 ? 'focused' : ''}`" id="step-3"><span class="code-comment">// Once the files have been mounted, we install the project's
  // dependencies by spawning `npm install`</span>
  <span class="code-blue">const</span> install <span class="code-grey">=</span> <span class="code-pink">await</span> webcontainer.spawn(<span class="code-orange">'npm'</span>, [<span class="code-orange">'i'</span>]);
  
  <span class="code-pink">await</span> install.onExit()<span class="code-grey">;</span></span>
    
  <span :class="`step-group ${focusedStep ? 'disabled' : ''} ${focusedStep === 4 ? 'focused' : ''}`" id="step-4"><span class="code-comment">// Once all dependencies have been installed, we can spawn `npm`
  // to run the `dev` script from the project's `package.json`</span>
  <span class="code-pink">await</span> webcontainer.spawn(<span class="code-orange">'npm'</span>, [<span class="code-orange">'run'</span>, <span class="code-orange">'dev'</span>])<span class="code-grey">;</span></span>
<span :class="`step-group ${focusedStep ? 'disabled' : ''}`" id="step-root-1">}</span></code></pre>
    </div>

    <div class="editor__content" v-else>
      <pre>
<code><span class="code-blue">export</span> <span class="code-blue">const</span> projectFiles <span class="code-grey">=</span> {
  myProject<span class="code-grey">:</span> {
    directory<span class="code-grey">:</span> {
      <span class="code-orange">'package.json'</span><span class="code-grey">:</span> {
        file<span class="code-grey">:</span> {
          contents<span class="code-grey">:</span> <span class="code-orange">'...'</span><span class="code-grey">,</span>
        }
      }<span class="code-grey">,</span>
      <span class="code-orange">'index.js'</span><span class="code-grey">:</span> {
        file<span class="code-grey">:</span> {
          contents<span class="code-grey">:</span> <span class="code-orange">'...'</span><span class="code-grey">,</span>
        }
      }<span class="code-grey">,</span>
    }
  }
}<span class="code-grey">;</span></code></pre>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import '@theme/styles/vars';

.editor {
  border-radius: 12px;
  z-index: 4;
  box-shadow:
    inset 0 0 0 1px rgba(196, 208, 217, 0.4),
    inset 0 -1px 0 0 rgba(255,255,255,0.1),
    inset 0 1px 0 0 rgba(132, 185, 246, 0.1);
  background-image: radial-gradient(145% 110% at 46% 20%, rgba(250, 253, 255, 0.5) 50%, rgba(228, 238, 246, 0.6) 85%, #9abfe1 100%);
  backdrop-filter: blur(6px);
  overflow: hidden;
  :root.dark & {
    box-shadow:
      inset 0 0 0 1px rgba(193, 228, 255, 0.1),
      inset 0 -1px 0 0 rgba(255,255,255,0.1),
      inset 0 1px 0 0 rgba(132, 185, 246, 0.1);
    background-image: radial-gradient(145% 110% at 46% 20%, rgba(9, 12, 15, 0.5) 33%, rgba(17, 25, 33, 0.8) 85%, #0D1822 100%);
    backdrop-filter: blur(4px);
  }
}

.editor__heading {
  width: 100%;
  height: 48px;
  display: flex;
  box-shadow: 0 1px 0 0 rgba(196, 208, 217, 0.4);
  :root.dark & {
    box-shadow: 0 1px 0 0 rgba(255,255,255,0.1);
  }
  p {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 12.5px;
    font-weight: 600;
    text-align: center;
    opacity: 0.32;
    transition: ease 0.1s;
    transition-property: background-color, opacity;
    background-color: #fff;
    :root.dark & {
      background-color: #000;
    }
    &:not(:last-child) {
      border-right: solid 1px rgba(196, 208, 217, 0.5);
      :root.dark & {
        border-right: solid 1px rgba(193, 228, 255, 0.2);
      }
    }
    
    &.selected {
      box-shadow: 0 1px 0 0 #fff;
      opacity: 0.72;
      background-color: transparent;
      box-shadow: inset 0 -2px 0 0 var(--vp-c-brand-lighter);
      &:first-child {
        border-right: solid 1px rgba(196, 208, 217, 0.5);
      }
      &:last-child {
        border-left: solid 1px rgba(196, 208, 217, 0.2);
      }
      :root.dark & {
        box-shadow: inset 0 -2px 0 0 var(--vp-c-brand-darker), 0 1px 0 0 rgba(0, 0, 0, 0.8);
        background-color: transparent;
      }
    }
    &:hover:not(.selected) {
      opacity: 0.8;
      background-color: transparent;
      cursor: pointer;
      :root.dark & {
        background-color: transparent;
      }
    }
  }
}

.editor__content {
  width: 600px;
  @media (max-width: 1280px) {
    width: 560px;
  }
  @media (max-width: 700px) {
    max-width: 100%;
    overflow-x: auto;
  }
  pre {
    margin: 0;
    padding: 28px 32px;
    text-align: left;
    line-height: 1.12;
  }
  code {
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.5px;
    :root.dark & {
      color: #fff;
    }
    @media (max-width: 1280px) {
      font-size: 11.5px;
    }
  }
  
  span {
    &.code-blue {
      color: #2593d3;
    }
    &.code-pink {
      color: #e933d7;
    }
    &.code-orange {
      // color: #ff9100;
      color: #ff7700;
    }
    &.code-grey {
      color: rgba(0, 0, 0, 0.6);
    }
    &.code-comment {
      color: rgba(50, 102, 129, 0.6);
    }
    :root.dark & {
      &.code-blue {
        color: #3fbaff;
      }
      &.code-pink {
        color: #e34fd5;
      }
      &.code-orange {
        color: #ffb342;
      }
      &.code-grey {
        color: rgba(255, 255, 255, 0.7);
      }
      &.code-comment {
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  .step-group {
    transition: 0.2s ease;
    transition-property: opacity;
    &.disabled {
      opacity: 0.24;
    }
    &.focused {
      opacity: 1;
    }
  }
}
</style>
