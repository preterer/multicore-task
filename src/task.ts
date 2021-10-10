import { Worker } from "worker_threads";

const WORKER_PATH = "./lib/worker.js";
console.log("PATH:", WORKER_PATH);

export class Task<T> {
  private task: String;

  private worker: Worker;

  constructor(taskFunction: () => T, private taskArgs?: Record<string, any>) {
    this.worker = new Worker(WORKER_PATH);
    this.task = this.prepareTaskBody(taskFunction);
  }

  public run(): Promise<T> {
    const resultPromise = new Promise<T>((resolve, reject) =>
      this.worker.on("message", (result: { result?: T; error?: any }) => {
        if (result?.error) {
          return reject(result.error);
        }
        resolve(result?.result);
      })
    );
    this.worker.postMessage({ task: this.task, taskArgs: this.taskArgs });
    return resultPromise.then((result) => {
      this.worker.unref();
      return result;
    });
  }

  private prepareTaskBody(taskFunction: () => T): string {
    const body = taskFunction.toString();
    return body.slice(body.indexOf("{") + 1, -1);
  }
}
