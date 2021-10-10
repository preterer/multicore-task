# multicore-task

Proof of concept that node can actually be used with multiplecores.

The story behind it is that I was bored and wondering if it's possible.

It is absolutely not worth using if you have a big amount of small tasks to do (31ms VS I tried waiting for a few minutes).

It might be worth using if you have some big tasks to do, that can be done concurrently (like in the POC) (~10s vs ~2-3s).

# Run proof of concept

```
npm i
npm run build
npm run poc
npm run poc:failed
```

# Nice to have

- Better error handling
- Automatic result parsing
- Automatic variables insertion
- It is very possible that optimizations can be done
