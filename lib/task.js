import { Worker } from "worker_threads";
const WORKER_PATH = "./lib/worker.js";
export function runTask(taskFunction, taskArgs) {
    const worker = new Worker(WORKER_PATH);
    const task = prepareTaskBody(taskFunction);
    const resultPromise = new Promise((resolve, reject) => worker.on("message", (result) => {
        worker.unref();
        if (result?.error) {
            return reject(result.error);
        }
        resolve(result?.result);
    }));
    worker.postMessage({ task, taskArgs });
    return resultPromise;
}
function prepareTaskBody(taskFunction) {
    const body = taskFunction.toString();
    return body.slice(body.indexOf("{") + 1, -1);
}
//# sourceMappingURL=task.js.map