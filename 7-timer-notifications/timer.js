const notifier = require('node-notifier');

let hours = process.argv[2];
let minutes = process.argv[3];
let seconds = process.argv[4];

if (!hours && !minutes && !seconds) {
  throw new Error("Укажите значение для таймера");
}

function getTimeValue(value) {
  if (!value || value.length <= 1) {
    throw new Error("Неверно указано значение");
  }

  const number = value.replace(/[A-Za-z]/g, "");

  if (parseInt(number) < 0) {
    throw new Error("Нельзя указывать отрицательные значения");
  }

  if (number === 0) return true;

  return parseInt(number);
}

function parseTime(hours, minutes, seconds) {
  let secondsFromHours = 0,
    secondsFromMinutes = 0,
    milliSecondsFromSeconds = 0;

  if (hours) {
    secondsFromHours = getTimeValue(hours) * 60 * 60 * 1000;
  }

  if (minutes) {
    secondsFromMinutes = getTimeValue(minutes) * 60 * 1000;
  }

  if (seconds) {
    milliSecondsFromSeconds = getTimeValue(seconds) * 1000;
  }

  return secondsFromHours + secondsFromMinutes + milliSecondsFromSeconds;
}

setTimeout(() => {
  notifier.notify("Время звонка завершено");
}, parseTime(hours, minutes, seconds));
