const { Worker } = require("worker_threads");
const { performance, PerformanceObserver } = require("perf_hooks");
const os = require("os");
const { compute } = require("./hardFunction");

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});

performanceObserver.observe({ entryTypes: ["measure"] });

const cpus = os.cpus();
const coreCount = cpus.length;

const mainArray = Array(300000)
  .fill()
  .map((_, i) => i + 1);

const subArrays = [];
const chunkSize = Math.floor(mainArray.length / coreCount);

for (let i = 0; i < mainArray.length; i += chunkSize) {
  subArrays.push(mainArray.slice(i, i + chunkSize));
}

performance.mark("linear run start");
compute(mainArray);
performance.mark("linear run end");
performance.measure("linear run", "linear run start", "linear run end");

function workerFunction(array) {
  return new Promise((resolve, reject) => {
    performance.mark("worker start");
    const worker = new Worker(__dirname + "/worker", {
      workerData: {
        array,
      },
    });

    worker.on("message", (msg) => {
      performance.mark("worker end");
      performance.measure("worker", "worker start", "worker end");

      resolve(msg);
    });
  });
}

async function main() {
  try {
    // const result = await Promise.all([compute({ array: mainArray })]);
    for await (arr of subArrays) {
      workerFunction(arr);
    }
    await workerFunction(mainArray);
  } catch (error) {
    console.error(error.message);
  }
}

main();
