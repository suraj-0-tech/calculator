const exprEl = document.getElementById('expr');
const resEl = document.getElementById('res');
let expression = '';

function update() {
  exprEl.textContent = expression;
}

function push(value) {
  expression += value;
  update();
}

function clearAll() {
  expression = '';
  resEl.textContent = '0';
  update();
}

function backspace() {
  expression = expression.slice(0, -1);
  update();
}

function calculate() {
  try {
    const safeExpr = expression.replace(/÷/g, '/').replace(/×/g, '*');
    const result = Function('return ' + safeExpr)();
    resEl.textContent = result;
    expression = result.toString();
  } catch {
    resEl.textContent = 'Error';
  }
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');
    const action = btn.getAttribute('data-action');
    if (action === 'clear') return clearAll();
    if (action === 'back') return backspace();
    if (action === 'equals') return calculate();
    if (val) return push(val);
  });
});
