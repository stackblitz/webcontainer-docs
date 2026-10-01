<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { diffLines, withContext } from './diff';
import { baseFiles, type Files } from './project';
import { fileStateAt, spans, traceDuration, type Span } from './trace';
import { startProject, type Status } from './webcontainer';

const statusLabels: Record<Status, string> = {
  booting: 'Booting WebContainer…',
  installing: 'Installing dependencies…',
  starting: 'Starting Vite…',
  ready: 'Ready',
  unsupported: "WebContainers aren't supported in this browser.",
  error: 'Something went wrong, check the console.',
};

const sections = ['input', 'output', 'expected'] as const;
const diffPrefix = { add: '+', remove: '-', same: ' ' };

// -1 = before the first span, nothing applied yet
const cursor = ref(-1);
const status = ref<Status>('booting');
const log = ref('');
const previewUrl = ref<string>();

const stepIndexes = spans.flatMap((span, index) => (span.changes ? [index] : []));

const isReady = computed(() => status.value === 'ready');
const stepNumber = computed(() => stepIndexes.filter((index) => index <= cursor.value).length);
const nextStep = computed(() => stepIndexes.find((index) => index > cursor.value));
const previousStep = computed(() =>
  cursor.value < 0 ? undefined : ([...stepIndexes].reverse().find((index) => index < cursor.value) ?? -1)
);

// span shown in the inspector modal, independent of the cursor
const inspectedIndex = ref<number>();
const inspected = computed<Span | undefined>(() =>
  inspectedIndex.value === undefined ? undefined : spans[inspectedIndex.value]
);
const inspector = ref<HTMLDialogElement>();

function inspect(index: number) {
  inspectedIndex.value = index;
  inspector.value?.showModal();
}

function closeInspector() {
  inspector.value?.close();
}

// clicks on the dialog element itself (not its content) are clicks on the backdrop
function onInspectorClick(event: MouseEvent) {
  if (event.target === inspector.value) {
    closeInspector();
  }
}

const inspectedDiffs = computed(() => {
  const span = inspected.value;

  if (!span?.changes || inspectedIndex.value === undefined) {
    return [];
  }

  const before = fileStateAt(inspectedIndex.value - 1);

  return span.changes.map((change) => ({
    path: change.path,
    lines: withContext(diffLines(before[change.path] ?? '', change.contents)),
  }));
});

let project: ReturnType<typeof startProject> | undefined;
let applied: Files = { ...baseFiles };
let isSyncing = false;

// writes whatever differs between the container and the cursor; loops so rapid stepping settles on the latest state
async function sync() {
  if (isSyncing || !project) {
    return;
  }

  isSyncing = true;

  try {
    while (true) {
      const target = fileStateAt(cursor.value);
      const changed = Object.fromEntries(Object.entries(target).filter(([path, contents]) => applied[path] !== contents));

      if (Object.keys(changed).length === 0) {
        break;
      }

      await project.writeFiles(changed);

      applied = { ...applied, ...changed };
    }
  } finally {
    isSyncing = false;
  }
}

const PLAY_INTERVAL = 1000;

const isPlaying = ref(false);
let playTimer: ReturnType<typeof setInterval> | undefined;

function play() {
  if (!isReady.value) {
    return;
  }

  if (nextStep.value === undefined) {
    jump(-1);
  }

  isPlaying.value = true;
  advance();
  playTimer = setInterval(advance, PLAY_INTERVAL);
}

function pause() {
  isPlaying.value = false;
  clearInterval(playTimer);
  playTimer = undefined;
}

function advance() {
  jump(nextStep.value);

  if (nextStep.value === undefined) {
    pause();
  }
}

/** Manual navigation stops playback. */
function seek(index: number | undefined) {
  pause();
  jump(index);
}

// slider value k = the kth modifying span, 0 = before the trace
function onScrub(event: Event) {
  const value = Number((event.target as HTMLInputElement).value);

  seek(value === 0 ? -1 : stepIndexes[value - 1]);
}

function jump(index: number | undefined) {
  if (index === undefined || !isReady.value) {
    return;
  }

  cursor.value = index;
  sync();
}

function formatDuration(ms: number) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function formatValue(value: unknown) {
  return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
}

function barStyle(span: Span) {
  return {
    left: `${(span.start / traceDuration) * 100}%`,
    width: `${Math.max((span.duration / traceDuration) * 100, 0.5)}%`,
  };
}

onMounted(() => {
  project = startProject(baseFiles, {
    onStatus: (value) => (status.value = value),
    onLog: (line) => (log.value = line),
    onServerReady: (url) => (previewUrl.value = url),
  });
});

onUnmounted(() => {
  pause();
  project?.dispose();
  project = undefined;
});
</script>

<template>
  <div class="demo">
    <a href="/ai">&larr; Back to AI</a>
    <h1>AI evaluation and debugging</h1>
    <p class="lede">
      Step through an agent's trace. Every step jumps to the next span that changed the project and applies its
      changes to a live Vite app running in WebContainer.
    </p>

    <div class="debugger">
      <section class="trace">
        <div class="toolbar">
          <button
            type="button"
            title="Reset"
            aria-label="Reset"
            :disabled="!isReady || cursor < 0"
            @click="seek(-1)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          </button>
          <button
            type="button"
            title="Step back"
            aria-label="Step back"
            :disabled="!isReady || previousStep === undefined"
            @click="seek(previousStep)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            class="primary"
            :title="isPlaying ? 'Pause' : 'Play'"
            :aria-label="isPlaying ? 'Pause' : 'Play'"
            :disabled="!isReady"
            @click="isPlaying ? pause() : play()"
          >
            <svg v-if="isPlaying" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5v14" />
              <path d="M15 5v14" />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 4.5v15l12-7.5z" />
            </svg>
          </button>
          <button
            type="button"
            title="Step"
            aria-label="Step"
            :disabled="!isReady || nextStep === undefined"
            @click="seek(nextStep)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
          <input
            class="playhead"
            type="range"
            min="0"
            :max="stepIndexes.length"
            step="1"
            aria-label="Playhead"
            :value="stepNumber"
            :disabled="!isReady"
            @input="onScrub"
          />
          <span class="progress">{{ stepNumber }} / {{ stepIndexes.length }}</span>
        </div>

        <ol class="spans">
          <li
            v-for="(span, index) in spans"
            :key="span.id"
            :class="{ current: index === cursor, past: index < cursor, disabled: !isReady }"
            @click="seek(index)"
          >
            <span class="name" :style="{ paddingLeft: `${span.depth * 18}px` }">
              <span class="badge" :class="span.type">{{ span.type }}</span>
              <span class="label">{{ span.name }}</span>
              <span
                v-if="span.changes"
                class="marker"
                :class="{ applied: index <= cursor }"
                :title="`Modifies ${span.changes.map((change) => change.path).join(', ')}`"
              />
              <span
                v-if="span.metrics?.score !== undefined"
                class="score"
                :class="span.metrics.score === 1 ? 'pass' : 'fail'"
              >
                {{ span.metrics.score.toFixed(2) }}
              </span>
              <button
                type="button"
                class="inspect"
                title="Inspect span"
                aria-label="Inspect span"
                @click.stop="inspect(index)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </span>
            <span class="timeline"><span class="bar" :class="span.type" :style="barStyle(span)" /></span>
            <span class="duration">{{ formatDuration(span.duration) }}</span>
          </li>
        </ol>

      </section>

      <section class="preview">
        <div class="address">
          <span class="status" :class="status" />
          <span>{{ isReady ? 'localhost:5173' : statusLabels[status] }}</span>
        </div>
        <iframe v-if="previewUrl" :src="previewUrl" title="Preview" />
        <div v-else class="loading">
          <p>{{ statusLabels[status] }}</p>
          <code v-if="log">{{ log }}</code>
        </div>
      </section>
    </div>

    <dialog ref="inspector" class="inspector" @click="onInspectorClick" @close="inspectedIndex = undefined">
      <div v-if="inspected" class="inspector-content">
        <header>
          <span class="badge" :class="inspected.type">{{ inspected.type }}</span>
          <strong>{{ inspected.name }}</strong>
          <span class="meta">
            {{ formatDuration(inspected.duration) }}
            <template v-if="inspected.metrics?.promptTokens">
              · {{ inspected.metrics.promptTokens }} prompt / {{ inspected.metrics.completionTokens }} completion tokens
            </template>
            <template v-if="inspected.metadata?.model"> · {{ inspected.metadata.model }}</template>
          </span>
          <button type="button" class="close" title="Close" aria-label="Close" @click="closeInspector">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </header>

        <template v-for="section in sections" :key="section">
          <template v-if="inspected[section] !== undefined">
            <h4>{{ section }}</h4>
            <pre>{{ formatValue(inspected[section]) }}</pre>
          </template>
        </template>

        <template v-for="diff in inspectedDiffs" :key="diff.path">
          <h4>changes · {{ diff.path }}</h4>
          <pre class="diff"><template v-for="(line, index) in diff.lines" :key="index"><span v-if="line" :class="line.kind">{{ diffPrefix[line.kind] }} {{ line.text }}</span><span v-else class="skip">⋯</span></template></pre>
        </template>
      </div>
    </dialog>
  </div>
</template>

<style scoped lang="scss">
.demo {
  max-width: var(--content-max-width);
  margin: 48px auto;
  padding: 0 18px;
}

.lede {
  max-width: 720px;
  margin: 12px 0 0;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.debugger {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  height: 860px;
  margin-top: 32px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    height: auto;
  }
}

section {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--vp-c-divider);

  button {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    color: var(--vp-c-text-1);
    transition: background-color 0.1s;

    svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    &:hover:not(:disabled) {
      background: var(--vp-c-bg-soft);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &.primary {
      border-color: var(--vp-c-brand);
      background: var(--vp-c-brand);
      color: #fff;

      &:hover:not(:disabled) {
        background: var(--vp-c-brand-dark);
      }
    }
  }

  .playhead {
    flex: 1;
    min-width: 0;
    margin: 0 8px;
    accent-color: var(--vp-c-brand);
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .progress {
    min-width: 40px;
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-size: 13px;
    color: var(--vp-c-text-2);
  }
}

.spans {
  flex: 1;
  min-height: 0;
  margin: 0;
  padding: 8px 0;
  overflow: auto;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 26% 56px;
    align-items: center;
    gap: 16px;
    margin: 0;
    padding: 7px 20px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      background: var(--vp-c-bg-soft);

      .inspect {
        opacity: 1;
      }
    }

    &.past {
      opacity: 0.65;
    }

    &.current {
      opacity: 1;
      background: var(--vp-c-bg-soft);
      box-shadow: inset 2px 0 0 var(--vp-c-brand);
    }

    &.disabled {
      cursor: default;
    }
  }
}

.name {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--vp-font-family-mono);
  }
}

.inspect,
.close {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  color: var(--vp-c-text-2);

  &:hover {
    background: var(--vp-c-divider);
    color: var(--vp-c-text-1);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

.inspect {
  margin-left: auto;
  opacity: 0;

  &:focus-visible {
    opacity: 1;
  }
}

.badge {
  flex-shrink: 0;
  min-width: 44px;
  padding: 0 6px;
  border-radius: 4px;
  font-size: 10.5px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}

.task { background: #64748b; }
.llm { background: #7c3aed; }
.tool { background: #0891b2; }
.eval { background: #d97706; }
.score { background: #ca8a04; }

.marker {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border: 2px solid var(--vp-c-brand);
  border-radius: 50%;

  &.applied {
    background: var(--vp-c-brand);
  }
}

.name .score {
  flex-shrink: 0;
  padding: 0 4px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: none;

  &.pass { color: #16a34a; }
  &.fail { color: #dc2626; }
}

.timeline {
  position: relative;
  height: 8px;

  .bar {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 2px;
    opacity: 0.8;
  }
}

.duration {
  font-size: 12px;
  text-align: right;
  color: var(--vp-c-text-2);
}

.inspector {
  width: min(880px, calc(100vw - 48px));
  max-height: 85vh;
  padding: 0;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
}

.inspector-content {
  padding: 24px;

  header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    font-size: 15px;
  }

  .close {
    margin-left: auto;
  }

  .meta {
    font-size: 13px;
    color: var(--vp-c-text-2);
  }

  h4 {
    margin: 24px 0 8px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--vp-c-text-2);
  }

  pre {
    margin: 0;
    padding: 14px 16px;
    border-radius: 8px;
    font-family: var(--vp-font-family-mono);
    font-size: 12.5px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
    background: var(--vp-c-bg-soft);
  }

  .diff span {
    display: block;
  }

  .diff .add {
    background: rgba(22, 163, 74, 0.14);
  }

  .diff .remove {
    background: rgba(220, 38, 38, 0.14);
  }

  .diff .skip {
    color: var(--vp-c-text-3);
  }
}

.trace {
  @media (max-width: 960px) {
    height: 760px;
  }
}

.preview {
  @media (max-width: 960px) {
    height: 640px;
  }

  iframe {
    flex: 1;
    width: 100%;
    border: 0;
    background: #fff;
  }
}

.address {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 65px;
  padding: 0 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-2);

  .status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d97706;

    &.ready { background: #16a34a; }
    &.error, &.unsupported { background: #dc2626; }
  }
}

.loading {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-2);

  p {
    margin: 0;
  }

  code {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }
}
</style>
