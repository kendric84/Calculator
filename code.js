let input = document.getElementById("input");
let operator = "";
let var1 = 0;
let var2 = 0;
let savedValue = "";

let numberButton = document.getElementsByClassName("number-button");
Array.from(numberButton).forEach((button) => {
  button.addEventListener("click", () => {
    if (var1 != 0 && var2 != 0) {
      input.value = "";
      var2 = 0;
    }
    input.value += button.id;
  });
});

let operatorButton = document.getElementsByClassName("operator-button");
Array.from(operatorButton).forEach((button) => {
  button.addEventListener("click", () => {
    userInput(button.id);
  });
});

let commandButton = document.getElementsByClassName("command-button");
Array.from(commandButton).forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "memory-clear":
        savedValue = "";
        break;
      case "c":
        globalClear();
        break;
      case "ce":
        input.value = "";
        break;
      case "del":
        input.value = input.value.slice(0, -1);
        break;
      case "invert":
        invert();
        break;
      case "memory-save":
        savedValue = input.value;
        break;
      case "memory-recall":
        input.value = savedValue;
        break;
      case "equals":
        equals();
        break;
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (isNaN(event.key) === false) {
    if (var1 != 0 && var2 != 0) {
      input.value = "";
      var2 = 0;
    }

    input.value += event.key;
  } else {
    switch (event.key) {
      case "/":
      case "*":
      case "-":
      case "+":
        userInput(event.key);
        return;
      case "Enter":
        equals();
        return;
      case "Backspace":
        backspace();
        return;
      case "Escape":
        globalClear();
        return;
      case "Delete":
        clearEntry();
        return;
    }
  }
});

function userInput(buttonId) {
  let display = document.getElementById("display");
  if (operator === undefined || operator === "") {
    operator = buttonId;
  }
  if (input.value != "" && var1 === 0) {
    var1 = input.value;
    display.value = `${input.value} ${buttonId}`;
    input.value = "";
  } else if (var2 === 0) {
    var2 = input.value;
    calculate();
    operator = buttonId;
    display.value = `${display.value.slice(0, -1)} ${operator}`;
    updateHistory();
  } else {
    operator = buttonId;
    display.value = input.value;
    if (isNaN(display.value.slice(-1)) === true) {
      display.value = `${display.value.slice(0, -1)} ${operator}`;
    } else {
      display.value = `${display.value} ${operator}`;
    }
  }
  operator = buttonId;
}

function calculate() {
  switch (operator) {
    case "/":
      input.value = var1 / var2;
      break;
    case "*":
      input.value = var1 * var2;
      break;
    case "-":
      input.value = var1 - var2;
      break;
    case "+":
      input.value = Number(var1) + Number(var2);
      var1.to;
      break;
  }
  display.value += ` ${var2} ${operator}`;
  var1 = input.value;
}

function updateHistory() {
  let historyText = document.getElementById("history");
  historyValue = display.value.slice(0, -1);
  (historyText.value === "") ?
    (historyText.value = `${historyValue} \n = ${input.value} \n`):
    (historyText.value = `${historyText.value} \n ${historyValue} \n = ${input.value} \n`);
}

function globalClear() {
  display.value = "";
  input.value = "";
  var1 = 0;
  var2 = 0;
  operator = "";
}

function invert() {
  if (var1 === 0 || var2 === 0) {
    input.value = Number(input.value) * -1;
  } else {
    input.value = Number(input.value) * -1;
    var1 = Number(var1) * -1;
  }
}

function equals() {
  var2 = input.value;
  calculate();
  display.value = display.value.slice(0, -1) + " =";
  updateHistory();
}