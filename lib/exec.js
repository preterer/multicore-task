import { exec as nodeExec } from "child_process";
export function exec(command, parseOutput) {
    return new Promise((resolve, reject) => nodeExec(command, { windowsHide: false }, (error, stdout, stderr) => {
        if (error) {
            return reject(error);
        }
        return resolve(parseOutput ? parseOutput(stdout) : stdout);
    }));
}
//# sourceMappingURL=exec.js.map