const { spawn } = require("child_process");
const os = require("os");
const cpus = os.cpus();
const coreCount = cpus.length;

const childProcess = spawn("node", [`${__dirname}/app.js`], {
  env: {
    UV_THREADPOOL_SIZE: coreCount,
  },
});

childProcess.stdout.on("data", (data) => {
  console.log(data.toString());
});

childProcess.stderr.on("data", (data) => {
  console.log(data.toString());
});

childProcess.on("error", (error) => {
  console.log(error.message);
});

childProcess.on("exit", (code) => {
  console.log(code);
});
