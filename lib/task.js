import { Worker } from "worker_threads";
const WORKER_PATH = "./lib/worker.js";
console.log("PATH:", WORKER_PATH);
export class Task {
    taskArgs;
    task;
    worker;
    constructor(taskFunction, taskArgs) {
        this.taskArgs = taskArgs;
        this.worker = new Worker(WORKER_PATH);
        this.task = this.prepareTaskBody(taskFunction);
    }
    run() {
        const resultPromise = new Promise((resolve, reject) => this.worker.on("message", (result) => {
            if (result?.error) {
                return reject(result.error);
            }
            resolve(result?.result);
        }));
        this.worker.postMessage({ task: this.task, taskArgs: this.taskArgs });
        return resultPromise.then((result) => {
            this.worker.unref();
            return result;
        });
    }
    prepareTaskBody(taskFunction) {
        const body = taskFunction.toString();
        return body.slice(body.indexOf("{") + 1, -1);
    }
}
//# sourceMappingURL=task.js.map