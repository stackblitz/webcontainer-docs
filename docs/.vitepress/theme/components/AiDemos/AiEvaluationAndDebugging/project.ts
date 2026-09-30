// the lockfile skips dependency resolution on install; regenerate with
// `npm install --package-lock-only` in ./template after changing package.json
import packageJson from './template/package.json?raw';
import packageLock from './template/package-lock.json?raw';

/** Flat map of project-relative paths to file contents. */
export type Files = Record<string, string>;

/**
 * The project the agent starts from: an empty Vite 7 app. Every file the agent touches already
 * exists here so each step is picked up by Vite's watcher (CSS hot-swaps, the rest reloads).
 */
export const baseFiles: Files = {
  'package.json': packageJson,
  'package-lock.json': packageLock,
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tip calculator</title>
  </head>
  <body>
    <p class="empty">Nothing here yet.</p>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`,
  'main.js': `import './style.css';
`,
  'style.css': `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.empty {
  padding: 24px;
  color: #888;
}
`,
};

export const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tip calculator</title>
  </head>
  <body>
    <main class="card">
      <h1>Tip calculator</h1>

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
        </div>
      </fieldset>

      <label class="field">
        <span>People</span>
        <input id="people" type="number" min="1" step="1" value="1" />
      </label>

      <dl class="summary">
        <div>
          <dt>Tip per person</dt>
          <dd id="tip">$0.00</dd>
        </div>
        <div>
          <dt>Total per person</dt>
          <dd id="total">$0.00</dd>
        </div>
      </dl>
    </main>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`;

export const styleCss = `* {
  box-sizing: border-box;
}

body {
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f1f3f6;
  color: #1c2330;
}

.card {
  width: min(340px, calc(100vw - 32px));
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(28, 35, 48, 0.1);
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
  color: #5b6474;
}

legend {
  padding: 0;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d5dae2;
  border-radius: 8px;
  font: inherit;
  font-size: 16px;
  color: #1c2330;
}

.tips {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.tips button {
  padding: 10px 0;
  border: 1px solid #d5dae2;
  border-radius: 8px;
  background: #fff;
  font: inherit;
  font-size: 15px;
  cursor: pointer;
}

.tips button.active {
  border-color: #2563eb;
  background: #2563eb;
  color: #fff;
}

.summary {
  display: grid;
  gap: 12px;
  margin: 8px 0 0;
  padding: 16px;
  border-radius: 12px;
  background: #1c2330;
  color: #fff;
}

.summary div {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.summary dt {
  font-size: 13px;
  opacity: 0.7;
}

.summary dd {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}
`;

export const styleCssPolished = styleCss
  .replace(
    `.tips button.active {
  border-color: #2563eb;
  background: #2563eb;
  color: #fff;
}`,
    `.tips button {
  transition: background-color 0.15s, border-color 0.15s;
}

.tips button:hover {
  border-color: #7c3aed;
}

.tips button.active {
  border-color: #7c3aed;
  background: #7c3aed;
  color: #fff;
}

input:focus-visible,
.tips button:focus-visible {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
}`
  )
  .replace(
    `  background: #1c2330;
  color: #fff;
}

.summary div {`,
    `  background: linear-gradient(135deg, #4c1d95, #7c3aed);
  color: #fff;
}

.summary div {`
  );

export const mainJsBuggy = `import './style.css';

const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const tipButtons = document.querySelectorAll('[data-tip]');
const tipOutput = document.querySelector('#tip');
const totalOutput = document.querySelector('#total');

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

let tipPercent = 15;

function update() {
  const tip = bill.value * (tipPercent / 100);
  const total = bill.value + tip;
  const count = people.value || 1;

  tipOutput.textContent = currency.format(tip / count);
  totalOutput.textContent = currency.format(total / count);
}

tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tipPercent = Number(button.dataset.tip);
    tipButtons.forEach((other) => other.classList.toggle('active', other === button));
    update();
  });
});

bill.addEventListener('input', update);
people.addEventListener('input', update);

update();
`;

export const mainJsFixOld = `  const tip = bill.value * (tipPercent / 100);
  const total = bill.value + tip;
  const count = people.value || 1;`;

export const mainJsFixNew = `  const amount = parseFloat(bill.value) || 0;
  const count = Math.max(1, parseInt(people.value, 10) || 1);
  const tip = amount * (tipPercent / 100);
  const total = amount + tip;`;

export const mainJsFixed = mainJsBuggy.replace(mainJsFixOld, mainJsFixNew);
