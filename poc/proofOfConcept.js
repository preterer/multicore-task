import dayjs from "dayjs";

import { runTask } from "../lib";

const amount = process.env.AMOUNT ? parseInt(process.env.AMOUNT) : 10;

const arr = new Array(amount).fill(undefined);
const random = Math.floor(Math.random() * 54);

// @ts-ignore
await useTask();
// @ts-ignore
await conventional();

async function useTask() {
  const start = Date.now();

  const result = await Promise.all(
    arr.map((_, j) =>
      runTask(
        function () {
          let result = 0;
          for (let i = 1; i < 1000000000; i++) {
            const x = i % 64390;
            const y = i % 12315;
            // if (i === 55435 && j === 2) {
            //   throw new Error("TEST :)");
            // }
            result += x + y + j + random;
          }
          return { result, date: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS") };
        },
        { j, random, dayjs: { __useRequire: true } }
      )
    )
  ).catch((err) => err.message);

  const end = Date.now();
  console.log("TIME TASK: ", end - start);
  console.log("RESULT TASK: ", result);
}

async function conventional() {
  const start = Date.now();
  const result = await Promise.all(
    arr.map((_, j) => {
      let result = 0;
      for (let i = 1; i < 1000000000; i++) {
        const x = i % 64390;
        const y = i % 12315;
        result += x + y + j + random;
      }
      return { result, date: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS") };
    })
  );

  const end = Date.now();
  console.log("TIME CONV: ", end - start);
  console.log("RESULT CONV: ", result);
}
