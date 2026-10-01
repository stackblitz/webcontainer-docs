import {
  baseFiles,
  indexHtml,
  mainJsBuggy,
  mainJsFixed,
  mainJsFixNew,
  mainJsFixOld,
  styleCss,
  styleCssPolished,
  type Files,
} from './project';

export type SpanType = 'task' | 'llm' | 'tool' | 'eval' | 'score';

export interface FileChange {
  path: string;
  contents: string;
}

export interface Metrics {
  promptTokens?: number;
  completionTokens?: number;
  score?: number;
}

interface SpanFields {
  name: string;
  type: SpanType;
  input?: unknown;
  output?: unknown;
  expected?: unknown;
  metrics?: Metrics;
  metadata?: Record<string, unknown>;
  /** Files this span wrote. Spans with changes are the ones the debugger steps through. */
  changes?: FileChange[];
}

interface SpanNode extends SpanFields {
  /** Only needed for leaves; parents span their children. */
  duration?: number;
  children?: SpanNode[];
}

/** A span flattened in execution order, timed relative to the start of the trace (ms). */
export interface Span extends SpanFields {
  id: string;
  depth: number;
  start: number;
  duration: number;
}

const MODEL = 'claude-sonnet-4-5';
const GAP = 24;

const lines = (contents: string) => `<${contents.trimEnd().split('\n').length} lines>`;

function llm(
  duration: number,
  [promptTokens, completionTokens]: [number, number],
  input: unknown,
  output: { content: string; tool_calls?: { name: string; arguments: unknown }[] }
): SpanNode {
  return {
    name: 'anthropic.messages',
    type: 'llm',
    duration,
    input,
    output,
    metrics: { promptTokens, completionTokens },
    metadata: { model: MODEL, temperature: 0 },
  };
}

function writeFile(path: string, contents: string): SpanNode {
  return {
    name: 'write_file',
    type: 'tool',
    duration: 18,
    input: { path, contents: lines(contents) },
    output: `Wrote ${contents.trimEnd().split('\n').length} lines to ${path}`,
    changes: [{ path, contents }],
  };
}

function editFile(path: string, oldString: string, newString: string, contents: string): SpanNode {
  return {
    name: 'edit_file',
    type: 'tool',
    duration: 14,
    input: { path, old_string: oldString, new_string: newString },
    output: `Edited ${path}`,
    changes: [{ path, contents }],
  };
}

function score(name: string, input: unknown, expected: string, output: string): SpanNode {
  return {
    name,
    type: 'score',
    duration: 280,
    input,
    expected,
    output,
    metrics: { score: expected === output ? 1 : 0 },
  };
}

function runEvals(totals: [string, string]): SpanNode {
  const children = [
    score('renders_form', { selector: '#bill, [data-tip], #people' }, 'found', 'found'),
    score('tip_per_person', { bill: 50, tip: 15, people: 1 }, '$7.50', '$7.50'),
    score('total_per_person', { bill: 50, tip: 15, people: 1 }, '$57.50', totals[0]),
    score('splits_between_people', { bill: 50, tip: 15, people: 2 }, '$28.75', totals[1]),
  ];

  const passed = children.filter((child) => child.metrics?.score === 1).length;

  return {
    name: 'eval.tip_calculator',
    type: 'eval',
    input: { cases: children.length },
    output: { passed, failed: children.length - passed },
    metrics: { score: passed / children.length },
    children,
  };
}

const system = {
  role: 'system',
  content: 'You are a coding agent working in a Vite project. Use the tools to inspect and change files. Run the evals before finishing.',
};

const prompt =
  'Build a tip calculator: a bill amount, 10/15/20% tip presets and the number of people. Show the tip and total per person.';

const root: SpanNode = {
  name: 'agent.run',
  type: 'task',
  input: { prompt },
  output: 'Built a tip calculator with bill, tip presets and people inputs. All evals pass.',
  metadata: { model: MODEL, project: 'tip-calculator' },
  children: [
    llm(2100, [1840, 96], [system, { role: 'user', content: prompt }], {
      content: "I'll start by looking at the project.",
      tool_calls: [{ name: 'list_files', arguments: { path: '.' } }],
    }),
    {
      name: 'list_files',
      type: 'tool',
      duration: 12,
      input: { path: '.' },
      output: Object.keys(baseFiles).sort(),
    },
    llm(3400, [2012, 742], [{ role: 'tool', name: 'list_files', content: Object.keys(baseFiles).sort() }], {
      content: "It's an empty Vite app. I'll write the markup first: bill, tip presets, people and a summary.",
      tool_calls: [{ name: 'write_file', arguments: { path: 'index.html', contents: lines(indexHtml) } }],
    }),
    writeFile('index.html', indexHtml),
    llm(4100, [2790, 1105], [{ role: 'tool', name: 'write_file', content: 'Wrote index.html' }], {
      content: 'Now the styles.',
      tool_calls: [{ name: 'write_file', arguments: { path: 'style.css', contents: lines(styleCss) } }],
    }),
    writeFile('style.css', styleCss),
    llm(3800, [3935, 610], [{ role: 'tool', name: 'write_file', content: 'Wrote style.css' }], {
      content: 'Wiring up the calculation.',
      tool_calls: [{ name: 'write_file', arguments: { path: 'main.js', contents: lines(mainJsBuggy) } }],
    }),
    writeFile('main.js', mainJsBuggy),
    llm(900, [4580, 40], [{ role: 'tool', name: 'write_file', content: 'Wrote main.js' }], {
      content: 'Running the evals to check the output.',
      tool_calls: [{ name: 'run_evals', arguments: {} }],
    }),
    runEvals(['$507.50', '$253.75']),
    llm(
      5200,
      [5120, 388],
      [{ role: 'tool', name: 'run_evals', content: 'total_per_person: expected $57.50, got $507.50' }],
      {
        content:
          'The total is $507.50 instead of $57.50. `bill.value` is a string, so `bill.value + tip` concatenates "50" + 7.5 into "507.5". Parse the inputs as numbers before doing arithmetic.',
        tool_calls: [
          { name: 'edit_file', arguments: { path: 'main.js', old_string: mainJsFixOld, new_string: mainJsFixNew } },
        ],
      }
    ),
    editFile('main.js', mainJsFixOld, mainJsFixNew, mainJsFixed),
    llm(700, [5602, 38], [{ role: 'tool', name: 'edit_file', content: 'Edited main.js' }], {
      content: 'Re-running the evals.',
      tool_calls: [{ name: 'run_evals', arguments: {} }],
    }),
    runEvals(['$57.50', '$28.75']),
    llm(3000, [6190, 520], [{ role: 'tool', name: 'run_evals', content: '4/4 passed' }], {
      content: 'All evals pass. Polishing the accent color and adding hover and focus states.',
      tool_calls: [{ name: 'write_file', arguments: { path: 'style.css', contents: lines(styleCssPolished) } }],
    }),
    writeFile('style.css', styleCssPolished),
    llm(1600, [6930, 140], [{ role: 'tool', name: 'write_file', content: 'Wrote style.css' }], {
      content: 'Done. The calculator handles bill, tip presets and splitting between people, and all evals pass.',
    }),
  ],
};

function flatten(node: SpanNode, depth: number, start: number, spans: Span[]) {
  const span: Span = { ...node, id: `span-${spans.length}`, depth, start, duration: node.duration ?? 0 };

  delete (span as SpanNode).children;
  spans.push(span);

  if (node.children) {
    let time = start + GAP;

    for (const child of node.children) {
      time = flatten(child, depth + 1, time, spans) + GAP;
    }

    span.duration = time - start;
  }

  return start + span.duration;
}

export const spans: Span[] = [];

flatten(root, 0, 0, spans);

export const traceDuration = spans[0].duration;

/** Project files after every change up to and including the span at `index` (-1 = before the trace). */
export function fileStateAt(index: number): Files {
  const files = { ...baseFiles };

  for (const span of spans.slice(0, index + 1)) {
    for (const change of span.changes ?? []) {
      files[change.path] = change.contents;
    }
  }

  return files;
}
