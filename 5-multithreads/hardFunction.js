function checkNumber(array) {
  const arr = [];
  for (let i = 0; i <= array.length; i++) {
    if (array[i] % 3 === 0) {
      arr.push(array[i]);
    }
  }

  return arr;
}

function compute(array) {
  return checkNumber(array);
}

module.exports = { compute, checkNumber };
