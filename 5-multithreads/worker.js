const { parentPort, workerData } = require("worker_threads");
const { compute } = require("./hardFunction");

parentPort.postMessage(compute(workerData.array));
