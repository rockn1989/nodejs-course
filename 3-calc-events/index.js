const EventEmitter = require("events");
const emitter = new EventEmitter();

const add = require("./add");
const multiply = require("./multiply");

emitter.addListener("add", add);
emitter.addListener("multiply", multiply);

let firstNum = process.argv[2];
let secondNum = process.argv[3];
let command = process.argv[4];

if (!command) {
  throw new Error("Укажите команду");
}

if (!firstNum || !secondNum) throw new Error("Передайте 2 значения");

if (command === "add") {
  emitter.emit("add", firstNum, secondNum);
}

if (command === "multiply") {
  emitter.emit("multiply", firstNum, secondNum);
}
