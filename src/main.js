const NUMBERS = document.querySelectorAll("[data-number]");
const OPERATOR = document.querySelectorAll("[data-operator]");
const RENDER = document.getElementsByClassName("output")[0];
const EVAL = document.getElementById("evaluate");
const CLEAR = document.getElementById("clear");
const DEL = document.getElementById("delete");
let VALUES = [];

NUMBERS.forEach((btn) => {
  btn.addEventListener("click", render);
});

OPERATOR.forEach((btn) => {
  btn.addEventListener("click", renderOperator);
});

EVAL.addEventListener("click", evaluate);
CLEAR.addEventListener("click", clear);
DEL.addEventListener("click", del);
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function clear() {
  VALUES = [];
  RENDER.innerHTML = ``;
}

function del() {
  RENDER.innerHTML = RENDER.innerHTML.slice(0, -1);
}

async function operate(opr, a, b) {
  const OPR = {
    "+": add,
    "-": subtract,
    x: multiply,
    "/": divide,
  };

  try {
    const operation = OPR[opr];
    return Promise.resolve(parseFloat(operation(a, b)).toFixed(3));
  } catch (Error) {
    return Promise.reject(Error);
  }
}

async function render() {
  try {
    VALUES.push(parseFloat(this.textContent));
    Promise.resolve((RENDER.innerHTML += `${this.textContent}`));
  } catch (Error) {
    return Promise.reject(Error);
  }
}
async function renderOperator() {
  if (RENDER.innerHTML == ``) {
    throw "Must have a value before operator!";
  }
  try {
    Promise.resolve(RENDER.innerHTML += `${this.textContent}`);
    VALUES.push(this.textContent);
  } catch(Error) {
    Promise.reject(Error);
  } 
}

async function evaluate() {
  try {
    const result = await operate(VALUES[1], VALUES[0], VALUES[2]);
    Promise.resolve((RENDER.innerHTML = `${result}`));
    VALUES = [];
  } catch (Error) {
    return Promise.reject(Error);
  }
}
