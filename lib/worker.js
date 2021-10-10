import { parentPort } from "worker_threads";
parentPort.on("message", ({ task, taskArgs }) => {
    try {
        Promise.resolve(runTask(task, taskArgs))
            .then((result) => parentPort.postMessage({ result }))
            .catch((error) => parentPort.postMessage({ error }));
    }
    catch (error) {
        parentPort.postMessage({ error });
    }
});
function runTask(task, args = {}) {
    return new Function(...Object.keys(args), task)(...Object.values(args));
}
//# sourceMappingURL=worker.js.map