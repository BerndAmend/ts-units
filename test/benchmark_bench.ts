import { makeUnit } from "ts-units";

Deno.bench("makeUnit", () => {
  makeUnit("m", { length: 1 });
});

Deno.bench("makeQuantity", () => {
  meters(20);
});

const meters = makeUnit("m", { length: 1 });
const length1 = meters(20);

const yards = meters.times(0.9144);
const length2 = yards(13);
Deno.bench("plus", () => {
  length1.plus(length2);
});

Deno.bench("plus without ts-units", () => {
  20 + 11.8872;
});
