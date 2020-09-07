document.addEventListener("DOMContentLoaded", setMouseOver(), setNumberMouseClick(), setOperatorMouseClick(), setCommandMouseClick());

function setMouseOver() {
  let highlightButton = document.getElementsByClassName("button");
  for (let i = 0; i < highlightButton.length; i++) {
    document.getElementById(highlightButton[i].id).onmouseover = function () {
      highlightButton[i].setAttribute("style", "background-color:grey;");
    };
    document.getElementById(highlightButton[i].id).onmouseout = function () {
      highlightButton[i].setAttribute("style", "background-color:;");
    };
  }
}

function setNumberMouseClick() {
  let numberButton = document.getElementsByClassName("number-button");
  for (let i = 0; i < numberButton.length; i++) {
    document
      .getElementById(numberButton[i].id)
      .addEventListener("click", function () {
        if (var1 != 0 && var2 != 0) {
          document.getElementById("input").value = "";
          var2 = 0;
        }
        let input = document.getElementById("input");
        input.value = input.value + numberButton[i].id;
      });
  }
}

function setOperatorMouseClick() {
  let operatorButton = document.getElementsByClassName("operator-button");
  for (let i = 0; i < operatorButton.length; i++) {
    document
      .getElementById(operatorButton[i].id)
      .addEventListener("click", function () {
        userInput(operatorButton[i].id);
      });
  }
}

let operator = "";
let var1 = 0;
let var2 = 0;
function userInput(buttonId) {
  let input = document.getElementById("input");
  let display = document.getElementById("display");
  if (operator === undefined || operator === "") {
    operator = buttonId;
  }
  if (input.value != "" && var1 === 0) {
    var1 = input.value;
    display.value = input.value + " " + buttonId;
    input.value = "";
  } else if (var2 === 0) {
    var2 = input.value;
    calculate();
    operator = buttonId;
    display.value = display.value.slice(0, -1) + " " + operator;
    updateHistory();
  } else {
    operator = buttonId;
    display.value = input.value;
    if (isNaN(display.value.slice(-1)) === true) {
      display.value = display.value.slice(0, -1) + " " + operator;
    } else {
      display.value = display.value + " " + operator;
    }
  }
  operator = buttonId;
}

function calculate() {
  switch (operator) {
    case "/":
      display.value = display.value + " " + var2 + " " + operator;
      input.value = var1 / var2;
      break;
    case "*":
      display.value = display.value + " " + var2 + " " + operator;
      input.value = var1 * var2;
      break;
    case "-":
      display.value = display.value + " " + var2 + " " + operator;
      input.value = var1 - var2;
      break;
    case "+":
      display.value = display.value + " " + var2 + " " + operator;
      input.value = Number(var1) + Number(var2);
      var1.to;
      break;
  }
  var1 = input.value;
}

function updateHistory() {
  let historyText = document.getElementById("history");
  historyValue = display.value.slice(0, -1);
  if (historyText.value === "") {
    historyText.value = historyValue + "\n" + "= " + input.value;
    +"\n";
  } else {
    historyText.value =
      historyText.value + "\n" + historyValue + "\n" + "= " + input.value;
    +"\n";
  }
}

function setCommandMouseClick() {
  let commandButton = document.getElementsByClassName("command-button");
  for (let i = 0; i < commandButton.length; i++) {
    document
      .getElementById(commandButton[i].id)
      .addEventListener("click", function () {
        let command = document.getElementById(commandButton[i].id).id;
        switch (command) {
          case "memory-clear":
            memoryClear();
            break;
          case "c":
            globalClear();
            break;
          case "ce":
            clearEntry();
            break;
          case "del":
            backspace();
            break;
          case "invert":
            invert();
            break;
          case "memory-save":
            memorySave();
            break;
          case "memory-recall":
            memoryRecall();
            break;
          case "equals":
            equals();
            break;
        }
      });
  }
}

document.addEventListener("keydown", function (event) {
  if (isNaN(event.key) === false) {
    if (var1 != 0 && var2 != 0) {
      document.getElementById("input").value = "";
      var2 = 0;
    }
    let input = document.getElementById("input");
    input.value = input.value + event.key;
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

function clearEntry() {
  input.value = "";
}

function globalClear() {
  display.value = "";
  input.value = "";
  var1 = 0;
  var2 = 0;
  operator = "";
}

function backspace() {
  input.value = input.value.slice(0, -1);
}

let savedValue = "";
function memorySave() {
  savedValue = input.value;
}

function memoryClear() {
  savedValue = "";
}

function memoryRecall() {
  input.value = savedValue;
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

/*
setMouseOver();
setNumberMouseClick();
setOperatorMouseClick();
setCommandMouseClick();
*/