const NUMBERS = document.querySelectorAll("[data-number]");
const OPERATOR = document.querySelectorAll("[data-operator]");

console.log(NUMBERS[0].innerText, OPERATOR[0].innerText);


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

async function operate(opr, a, b) {
  const OPR = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
  };
  try {
    const operation = OPR[opr];
    return Promise.resolve(operation(a, b));
  } catch (Error) {
    return Promise.reject(Error);
  }
}
