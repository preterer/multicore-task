import { Worker } from "worker_threads";

const WORKER_PATH = "./lib/worker.js";

export function runTask<T>(
  taskFunction: () => T,
  taskArgs?: Record<
    string,
    { __useRequire: true; __requireParam?: string } | any
  >
): Promise<T> {
  const worker = new Worker(WORKER_PATH);
  const task = prepareTaskBody(taskFunction);
  const resultPromise = new Promise<T>((resolve, reject) =>
    worker.on("message", (result: { result?: T; error?: any }) => {
      worker.unref();
      if (result?.error) {
        return reject(result.error);
      }
      resolve(result?.result);
    })
  );
  worker.postMessage({ task, taskArgs });
  return resultPromise;
}

function prepareTaskBody(taskFunction: () => any): string {
  const body = taskFunction.toString();
  return body.slice(body.indexOf("{") + 1, -1);
}
