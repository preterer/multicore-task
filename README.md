# multicore-task

Proof of concept that node can actually be used with multiple cores (started creating it before I vaguely remembered about workers in JS).

The story behind it is that I was bored and wondering if it's possible.

It is absolutely not worth using if you have a big amount of small tasks to do (~31ms VS I tried waiting for a few minutes on 10k tasks), unless you want to get a full load on your CPU to test thremals :).

It might be worth using if you have some big tasks to do, that can be done concurrently (like in the POC) (~20s vs ~3.5s).

# Run proof of concept

```
npm i
npm run build
npm run poc
npm run poc:failed
```

# Nice to have

- Unit tests
- Automatic variables insertion
- Or at least automatic detection of modules to import
- Make workers stop if the promise result is no longer needed (ie. one of Promise.all promises failed, or Promise.race has finished)
- It is very possible that optimizations can be done
