<template>
  <div class="terminal" aria-hidden="true">
    <div class="terminal__heading">
      <p>Terminal</p>
    </div>

    <div class="terminal__content">
<pre><code><span class="code-pink">&gt;</span> node
Welcome to Node.js v16.14.2
Type ".help" for more information.
> _</code></pre>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import '@theme/styles/vars';

.terminal {
  position: absolute;
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

.terminal__heading {
  width: 100%;
  height: 48px;
  display: flex;
  box-shadow: 0 1px 0 0 rgba(196, 208, 217, 0.4);
  :root.dark & {
    box-shadow: 0 1px 0 0 rgba(255,255,255,0.1);
  }
  p {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 32px;
    font-size: 12.5px;
    font-weight: 600;
    text-align: center;
    box-shadow: inset 0 -2px 0 0 var(--vp-c-brand-lighter);
    opacity: 0.72;
    transition: ease 0.1s;
    transition-property: background-color, opacity;
    :root.dark & {
      box-shadow: inset 0 -2px 0 0 var(--vp-c-brand-darker);
    }
  }
}

.terminal__content {
  width: 572px;
  height: 320px;
  pre {
    margin: 0;
    padding: 28px 32px;
    line-height: 1.32;
  }
  code {
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.5px;
    :root.dark & {
      color: #fff;
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
    }
  }
}
</style>
