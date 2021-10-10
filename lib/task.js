import { exec } from "./exec";
const newLineRegex = /\r\n/g;
export class Task {
    task;
    parser;
    constructor(taskFunction, options) {
        const body = this.prepareTaskBody(taskFunction, options?.args);
        this.parser = options?.parser;
        this.task = `const result = (${body})();console.log(result);`;
    }
    run() {
        return new Promise((resolve, reject) => exec(`node -e "${this.task}"`, this.parser).then(resolve, reject));
    }
    prepareTaskBody(taskFunction, args) {
        return this.setArgs(taskFunction.toString().replace(newLineRegex, ""), args);
    }
    setArgs(taskBody, args) {
        return args
            ? Object.entries(args).reduce((body, arg) => body.replace(new RegExp(`\\b${arg[0]}\\b`, "g"), arg[1]), taskBody)
            : taskBody;
    }
}
//# sourceMappingURL=task.js.map