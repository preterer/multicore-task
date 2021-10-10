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

function runTask(task: string, args: Record<string, any> | undefined): any {
  return getArgumentValues(args).then((values) => {
    return new Function(...getArguments(args), task)(...values);
  });
}

function getArguments(args: Record<string, any> | undefined): string[] {
  if (!args) {
    return [];
  }
  return Object.keys(args);
}

function getArgumentValues(
  args: Record<string, any> | undefined
): Promise<any[]> {
  return Promise.all(
    getArguments(args).map((parameter) => {
      const value = args[parameter];
      if (value && value.__useRequire) {
        return import(parameter).then(
          (importedModule) => importedModule[value.__requireParam || "default"]
        );
      }
      return value;
    })
  );
}
