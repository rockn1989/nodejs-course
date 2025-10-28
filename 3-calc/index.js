const add = require("./add");
const multiply = require("./multiply");

let firstNum = process.argv[3];
let secondNum = process.argv[4];
let command = process.argv[5];

if (!command) {
  throw new Error("Укажите команду");
}

if (!firstNum || !secondNum) throw new Error("Передайте 2 значения");

if (command === "add") {
  add(firstNum, secondNum);
}

if (command === "multiply") {
  multiply(firstNum, secondNum);
}
