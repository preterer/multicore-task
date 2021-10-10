import { exec } from "./exec";

const newLineRegex = /\r\n/g;

export class Task<T> {
  private task: String;

  private parser?: (output: string) => T;

  constructor(
    taskFunction: () => T,
    options?: { args?: Record<string, any>; parser?: (output: string) => T }
  ) {
    const body = this.prepareTaskBody(taskFunction, options?.args);
    this.parser = options?.parser;
    this.task = `const result = (${body})();console.log(result);`;
  }

  public run(): Promise<T> {
    return new Promise((resolve, reject) =>
      exec(`node -e "${this.task}"`, this.parser).then(resolve, reject)
    );
  }

  private prepareTaskBody(
    taskFunction: () => T,
    args: Record<string, any> | undefined
  ): string {
    return this.setArgs(
      taskFunction.toString().replace(newLineRegex, ""),
      args
    );
  }

  private setArgs(
    taskBody: string,
    args: Record<string, any> | undefined
  ): string {
    return args
      ? Object.entries(args).reduce(
          (body, arg) =>
            body.replace(new RegExp(`\\b${arg[0]}\\b`, "g"), arg[1]),
          taskBody
        )
      : taskBody;
  }
}
