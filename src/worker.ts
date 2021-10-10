import { parentPort } from "worker_threads";

parentPort.on(
  "message",
  ({ task, taskArgs }: { task: string; taskArgs?: any }) => {
    try {
      Promise.resolve(runTask(task, taskArgs))
        .then((result) => parentPort.postMessage({ result }))
        .catch((error) => parentPort.postMessage({ error }));
    } catch (error) {
      parentPort.postMessage({ error });
    }
  }
);

function runTask(task: string, args: Record<string, any> = {}): any {
  return new Function(...Object.keys(args), task)(...Object.values(args));
}
