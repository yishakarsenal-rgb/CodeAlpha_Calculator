document.addEventListener("DOMContentLoaded", () => {
  const previousOperandText = document.getElementById("previous-operand");
  const currentOperandText = document.getElementById("current-operand");

  let currentOperand = "0";
  let previousOperand = "";
  let operation = undefined;

  function clear() {
    currentOperand = "0";
    previousOperand = "";
    operation = undefined;
    updateDisplay();
  }

  function deleteNumber() {
    if (currentOperand === "0") return;
    if (currentOperand.length === 1) {
      currentOperand = "0";
    } else {
      currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
  }

  function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    if (currentOperand === "0" && number !== ".") {
      currentOperand = number.toString();
    } else {
      currentOperand += number.toString();
    }
    updateDisplay();
  }

  function chooseOperation(op) {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
  }

  function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
      case "*":
        computation = prev * current;
        break;
      case "÷":
      case "/":
        if (current === 0) {
          alert("Cannot divide by zero!");
          clear();
          return;
        }
        computation = prev / current;
        break;
      case "%":
        computation = prev % current;
        break;
      default:
        return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = "";
    updateDisplay();
  }

  function updateDisplay() {
    currentOperandText.textContent = currentOperand;
    if (operation != null) {
      previousOperandText.textContent = `${previousOperand} ${operation}`;
    } else {
      previousOperandText.textContent = "";
    }
  }

  // Event Listeners for UI Buttons
  document.querySelectorAll(".btn-number").forEach((button) => {
    button.addEventListener("click", () => appendNumber(button.dataset.number));
  });

  document.querySelectorAll(".btn-operator").forEach((button) => {
    button.addEventListener("click", () =>
      chooseOperation(button.dataset.operator),
    );
  });

  document
    .querySelector('[data-action="equals"]')
    .addEventListener("click", compute);
  document
    .querySelector('[data-action="clear"]')
    .addEventListener("click", clear);
  document
    .querySelector('[data-action="delete"]')
    .addEventListener("click", deleteNumber);

  // Bonus Feature: Keyboard Support
  window.addEventListener("keydown", (e) => {
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
      appendNumber(e.key);
    }
    if (e.key === "+" || e.key === "-") {
      chooseOperation(e.key);
    }
    if (e.key === "*") {
      chooseOperation("×");
    }
    if (e.key === "/") {
      e.preventDefault();
      chooseOperation("÷");
    }
    if (e.key === "%") {
      chooseOperation("%");
    }
    if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      compute();
    }
    if (e.key === "Backspace") {
      deleteNumber();
    }
    if (e.key === "Escape") {
      clear();
    }
  });
});
