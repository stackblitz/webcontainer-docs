import {
  indexHtml,
  mainJsBuggy,
  mainJsFixed,
  styleCss,
  styleCssPolished,
  type Files,
} from '../AiEvaluationAndDebugging/project';

export interface EvalResult {
  name: string;
  expected: string;
  output: string;
}

/** One experiment run: the same task, a different model or prompt, and the project it produced. */
export interface Run {
  id: string;
  name: string;
  model: string;
  prompt: string;
  created: string;
  duration: number;
  tokens: { prompt: number; completion: number };
  evals: EvalResult[];
  files: Files;
}

const evals = (total: string, split: string): EvalResult[] => [
  { name: 'renders_form', expected: 'found', output: 'found' },
  { name: 'tip_per_person', expected: '$7.50', output: '$7.50' },
  { name: 'total_per_person', expected: '$57.50', output: total },
  { name: 'splits_between_people', expected: '$28.75', output: split },
];

export const isPassing = (result: EvalResult) => result.expected === result.output;

export const scoreOf = (run: Run) => run.evals.filter(isPassing).length / run.evals.length;

const customIndexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tip calculator</title>
  </head>
  <body>
    <main class="card">
      <h1>Split the bill</h1>

      <label class="field">
        <span>Bill</span>
        <input id="bill" type="number" min="0" step="0.01" value="50" />
      </label>

      <fieldset class="field">
        <legend>Tip</legend>
        <div class="tips">
          <button type="button" data-tip="10">10%</button>
          <button type="button" data-tip="15" class="active">15%</button>
          <button type="button" data-tip="20">20%</button>
          <input id="custom-tip" type="number" min="0" step="1" placeholder="Custom" aria-label="Custom tip %" />
        </div>
      </fieldset>

      <fieldset class="field">
        <legend>People</legend>
        <div class="stepper">
          <button type="button" data-step="-1" aria-label="Fewer people">&minus;</button>
          <input id="people" type="number" min="1" step="1" value="1" aria-label="People" />
          <button type="button" data-step="1" aria-label="More people">+</button>
        </div>
      </fieldset>

      <dl class="summary">
        <div>
          <dt>Tip per person</dt>
          <dd id="tip">$0.00</dd>
        </div>
        <div>
          <dt>Total per person</dt>
          <dd id="total">$0.00</dd>
        </div>
        <div class="bill-total">
          <dt>Bill with tip</dt>
          <dd id="bill-total">$0.00</dd>
        </div>
      </dl>
    </main>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`;

const customStyleCss = `* {
  box-sizing: border-box;
}

body {
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #0f1117;
  color: #e6e8ee;
}

.card {
  width: min(340px, calc(100vw - 32px));
  padding: 24px;
  border: 1px solid #262b38;
  border-radius: 16px;
  background: #171a23;
}

h1 {
  margin: 0 0 20px;
  font-size: 20px;
}

.field {
  display: grid;
  gap: 6px;
  margin: 0 0 16px;
  padding: 0;
  border: 0;
  font-size: 13px;
  font-weight: 600;
  color: #8b93a7;
}

legend {
  padding: 0;
  margin-bottom: 6px;
}

input,
button {
  font: inherit;
  font-size: 15px;
  color: #e6e8ee;
}

input {
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid #2c3242;
  border-radius: 8px;
  background: #0f1117;
}

button {
  border: 1px solid #2c3242;
  border-radius: 8px;
  background: #1f2430;
  cursor: pointer;
}

input:focus-visible,
button:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

.tips {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 1.4fr;
  gap: 8px;
}

.tips button {
  padding: 10px 0;
}

.tips .active {
  border-color: #10b981;
  background: #10b981;
  color: #04120d;
}

.stepper {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  gap: 8px;
}

.stepper input {
  text-align: center;
}

.summary {
  display: grid;
  gap: 12px;
  margin: 8px 0 0;
  padding: 16px;
  border-radius: 12px;
  background: #0f1117;
}

.summary div {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.summary dt {
  font-size: 13px;
  color: #8b93a7;
}

.summary dd {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #34d399;
}

.summary .bill-total {
  padding-top: 12px;
  border-top: 1px solid #262b38;
}

.summary .bill-total dd {
  font-size: 15px;
  color: #e6e8ee;
}
`;

const customMainJs = `import './style.css';

const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const customTip = document.querySelector('#custom-tip');
const tipButtons = document.querySelectorAll('[data-tip]');
const stepButtons = document.querySelectorAll('[data-step]');
const tipOutput = document.querySelector('#tip');
const totalOutput = document.querySelector('#total');
const billOutput = document.querySelector('#bill-total');

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

let tipPercent = 15;

function update() {
  const amount = parseFloat(bill.value) || 0;
  const count = Math.max(1, parseInt(people.value, 10) || 1);
  const tip = amount * (tipPercent / 100);

  tipOutput.textContent = currency.format(tip / count);
  totalOutput.textContent = currency.format((amount + tip) / count);
  billOutput.textContent = currency.format(amount + tip);
}

function selectTip(percent, active) {
  tipPercent = percent;
  tipButtons.forEach((button) => button.classList.toggle('active', button === active));
  customTip.classList.toggle('active', customTip === active);
  update();
}

tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    customTip.value = '';
    selectTip(Number(button.dataset.tip), button);
  });
});

customTip.addEventListener('input', () => {
  selectTip(Math.max(0, parseFloat(customTip.value) || 0), customTip);
});

stepButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const count = parseInt(people.value, 10) || 1;

    people.value = Math.max(1, count + Number(button.dataset.step));
    update();
  });
});

bill.addEventListener('input', update);
people.addEventListener('input', update);

update();
`;

export const runs: Run[] = [
  {
    id: 'run-1',
    name: 'sonnet-baseline',
    model: 'claude-sonnet-4-5',
    prompt: 'v1',
    created: 'Sep 29, 14:02',
    duration: 25_300,
    tokens: { prompt: 38_999, completion: 3_679 },
    evals: evals('$57.50', '$28.75'),
    files: { 'index.html': indexHtml, 'style.css': styleCssPolished, 'main.js': mainJsFixed },
  },
  {
    id: 'run-2',
    name: 'haiku-baseline',
    model: 'claude-haiku-4-5',
    prompt: 'v1',
    created: 'Sep 29, 14:09',
    duration: 9_800,
    tokens: { prompt: 18_420, completion: 2_310 },
    evals: evals('$507.50', '$253.75'),
    files: { 'index.html': indexHtml, 'style.css': styleCss, 'main.js': mainJsBuggy },
  },
  {
    id: 'run-3',
    name: 'opus-custom-tip',
    model: 'claude-opus-4-1',
    prompt: 'v2',
    created: 'Sep 30, 09:41',
    duration: 38_400,
    tokens: { prompt: 31_280, completion: 4_905 },
    evals: evals('$57.50', '$28.75'),
    files: { 'index.html': customIndexHtml, 'style.css': customStyleCss, 'main.js': customMainJs },
  },
];
