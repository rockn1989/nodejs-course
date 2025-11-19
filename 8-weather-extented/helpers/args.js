
export const getArgs = (args) => {
  const res = {};
  const rest = args.slice(2);
  let currentArg = null;
  rest.forEach((val, index, array) => {
    if (val.charAt(0) == '-') {
      currentArg = val.substring(1);
      if (index == array.length - 1) {
        res[val.substring(1)] = true;
      } else if (array[index + 1].charAt(0) != '-') {
        res[val.substring(1)] = array[index + 1];
      } else {
        res[val.substring(1)] = true;
      }
    } else {
      if (!res[currentArg].includes(val)) {
         res[currentArg] += `,${val}`;
      }
     
    }
  });

  return res;
}

