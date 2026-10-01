<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from 'vue';
import type { Status } from '../AiEvaluationAndDebugging/webcontainer';
import { isPassing, runs, scoreOf, type Run } from './runs';
import { portOf, startComparison } from './webcontainer';

const statusLabels: Record<Status, string> = {
  booting: 'Booting WebContainer…',
  installing: 'Installing dependencies…',
  starting: 'Starting Vite…',
  ready: 'Ready',
  unsupported: "WebContainers aren't supported in this browser.",
  error: 'Something went wrong, check the console.',
};

const MIN_SELECTED = 2;

interface RunState {
  status: Status;
  log: string;
  url?: string;
}

const states = reactive<Record<string, RunState>>(
  Object.fromEntries(runs.map((run) => [run.id, { status: 'booting', log: '' }]))
);

const selected = ref<string[]>([]);
const compared = ref<Run[]>([]);

const canCompare = computed(() => selected.value.length >= MIN_SELECTED);
const isAllSelected = computed(() => selected.value.length === runs.length);

function toggle(runId: string) {
  selected.value = selected.value.includes(runId)
    ? selected.value.filter((id) => id !== runId)
    : [...selected.value, runId];
}

function toggleAll() {
  selected.value = isAllSelected.value ? [] : runs.map((run) => run.id);
}

let comparison: ReturnType<typeof startComparison> | undefined;

// boots lazily on the first comparison; later comparisons only start servers that aren't running yet
function compare() {
  if (!canCompare.value) {
    return;
  }

  compared.value = runs.filter((run) => selected.value.includes(run.id));

  comparison ??= startComparison(runs, {
    onStatus: (runId, status) => (states[runId].status = status),
    onLog: (runId, line) => (states[runId].log = line),
    onServerReady: (runId, url) => (states[runId].url = url),
  });

  for (const run of compared.value) {
    comparison.serve(run.id);
  }
}

function formatDuration(ms: number) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function formatTokens(run: Run) {
  return (run.tokens.prompt + run.tokens.completion).toLocaleString('en-US');
}

function passedCount(run: Run) {
  return run.evals.filter(isPassing).length;
}

onUnmounted(() => {
  comparison?.dispose();
  comparison = undefined;
});
</script>

<template>
  <div class="demo">
    <a href="/ai">&larr; Back to AI</a>
    <h1>Side-by-side A/B comparison</h1>
    <p class="lede">
      Three runs of the same task with different models and prompts. Select two or three and compare them: every run
      is mounted into one WebContainer and served by its own Vite dev server, so you can use the generated apps next
      to their eval scores.
    </p>

    <section class="experiments">
      <div class="toolbar">
        <strong>tip-calculator</strong>
        <span class="count">{{ selected.length }} of {{ runs.length }} selected</span>
        <button type="button" class="primary" :disabled="!canCompare" @click="compare">
          {{ canCompare ? `Compare ${selected.length} runs` : `Select ${MIN_SELECTED} or more to compare` }}
        </button>
      </div>

      <div class="table">
        <table>
          <thead>
            <tr>
              <th class="check">
                <input
                  type="checkbox"
                  aria-label="Select all runs"
                  :checked="isAllSelected"
                  :indeterminate="selected.length > 0 && !isAllSelected"
                  @change="toggleAll"
                />
              </th>
              <th>Run</th>
              <th>Model</th>
              <th>Prompt</th>
              <th>Score</th>
              <th>Evals</th>
              <th class="numeric">Tokens</th>
              <th class="numeric">Duration</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="run in runs"
              :key="run.id"
              :class="{ selected: selected.includes(run.id) }"
              @click="toggle(run.id)"
            >
              <td class="check">
                <input
                  type="checkbox"
                  :aria-label="`Select ${run.name}`"
                  :checked="selected.includes(run.id)"
                  @click.stop
                  @change="toggle(run.id)"
                />
              </td>
              <td class="mono">{{ run.name }}</td>
              <td class="mono">{{ run.model }}</td>
              <td><span class="tag">{{ run.prompt }}</span></td>
              <td>
                <span class="score" :class="scoreOf(run) === 1 ? 'pass' : 'fail'">
                  <span class="meter"><span :style="{ width: `${scoreOf(run) * 100}%` }" /></span>
                  {{ scoreOf(run).toFixed(2) }}
                </span>
              </td>
              <td>{{ passedCount(run) }} / {{ run.evals.length }}</td>
              <td class="numeric">{{ formatTokens(run) }}</td>
              <td class="numeric">{{ formatDuration(run.duration) }}</td>
              <td class="muted">{{ run.created }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div v-if="compared.length" class="comparison" :style="{ '--columns': compared.length }">
      <section v-for="run in compared" :key="run.id" class="panel">
        <header>
          <div class="title">
            <strong class="mono">{{ run.name }}</strong>
            <span class="score" :class="scoreOf(run) === 1 ? 'pass' : 'fail'">{{ scoreOf(run).toFixed(2) }}</span>
          </div>
          <div class="muted">{{ run.model }} · prompt {{ run.prompt }} · {{ formatTokens(run) }} tokens</div>
          <ul class="evals">
            <li
              v-for="result in run.evals"
              :key="result.name"
              :class="isPassing(result) ? 'pass' : 'fail'"
              :title="`expected ${result.expected}, got ${result.output}`"
            >
              <span class="dot" />
              <span class="mono">{{ result.name }}</span>
              <span v-if="!isPassing(result)" class="got">
                {{ result.output }} <span class="muted">≠ {{ result.expected }}</span>
              </span>
            </li>
          </ul>
        </header>

        <div class="address">
          <span class="status" :class="states[run.id].status" />
          <span>
            {{ states[run.id].status === 'ready' ? `localhost:${portOf(runs, run.id)}` : statusLabels[states[run.id].status] }}
          </span>
        </div>
        <iframe v-if="states[run.id].url" :src="states[run.id].url" :title="`Preview of ${run.name}`" />
        <div v-else class="loading">
          <p>{{ statusLabels[states[run.id].status] }}</p>
          <code v-if="states[run.id].log">{{ states[run.id].log }}</code>
        </div>
      </section>
    </div>
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

section {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.mono {
  font-family: var(--vp-font-family-mono);
}

.muted {
  color: var(--vp-c-text-2);
}

.experiments {
  margin-top: 32px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 14px;

  .count {
    font-size: 13px;
    color: var(--vp-c-text-2);
  }

  button {
    margin-left: auto;
    height: 36px;
    padding: 0 16px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    transition: background-color 0.1s;

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
}

.table {
  overflow-x: auto;
}

table {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  font-size: 13px;

  tr {
    border: 0;
    background: none;
  }

  th,
  td {
    padding: 10px 16px;
    border: 0;
    text-align: left;
    white-space: nowrap;
  }

  th {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--vp-c-text-2);
    background: var(--vp-c-bg-soft);
  }

  tbody tr {
    border-top: 1px solid var(--vp-c-divider);
    cursor: pointer;

    &:hover {
      background: var(--vp-c-bg-soft);
    }

    &.selected {
      background: var(--vp-c-bg-soft);
      box-shadow: inset 2px 0 0 var(--vp-c-brand);
    }
  }

  .check {
    width: 1px;
    padding-right: 0;

    input {
      accent-color: var(--vp-c-brand);
      cursor: pointer;
    }
  }

  .numeric {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
}

.tag {
  padding: 1px 6px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  background: var(--vp-c-divider);
}

.score {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;

  &.pass { color: #16a34a; }
  &.fail { color: #dc2626; }

  .meter {
    width: 48px;
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
    background: var(--vp-c-divider);

    span {
      display: block;
      height: 100%;
      background: currentColor;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
}

.panel {
  height: 860px;

  @media (max-width: 960px) {
    height: 760px;
  }

  header {
    display: grid;
    gap: 6px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--vp-c-divider);
    font-size: 13px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 14px;
  }

  iframe {
    flex: 1;
    width: 100%;
    border: 0;
    background: #fff;
  }
}

.evals {
  display: grid;
  gap: 4px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
  }

  .dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .pass .dot { background: #16a34a; }
  .fail .dot { background: #dc2626; }

  .got {
    margin-left: auto;
    font-family: var(--vp-font-family-mono);
    color: #dc2626;
  }
}

.address {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 49px;
  padding: 0 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-2);

  .status {
    flex-shrink: 0;
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
