import { Task } from "../lib";

const amount = process.env.AMOUNT ? parseInt(process.env.AMOUNT) : 10000;

const arr = new Array(amount).fill(undefined);
const random = Math.floor(Math.random() * 54);

// @ts-ignore
await conventional();
// @ts-ignore
await useTask();

async function useTask() {
  const start = Date.now();

  const result = await Promise.all(
    arr.map((_, j) =>
      new Task(
        function () {
          const x = j * 1234;
          const y = (j + 123) * 43;
          return x + y + random;
        },
        { parser: parseInt, args: { j, random } }
      ).run()
    )
  );

  const end = Date.now();
  console.log("TIME TASK: ", end - start);
  console.log("RESULT TASK: ", result);
}

async function conventional() {
  const start = Date.now();
  const result = await Promise.all(
    arr.map(
      (_, j) =>
        // it's actually even slower than without that.
        new Promise((resolve) =>
          setTimeout(() => {
            const x = j * 1234;
            const y = (j + 123) * 43;
            resolve(x + y + random);
          })
        )
    )
  );

  const end = Date.now();
  console.log("TIME CONV: ", end - start);
  console.log("RESULT CONV: ", result);
}
