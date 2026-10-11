import { test } from "vitest";
import { makeUnit } from "#mod";

const meters = makeUnit("m", { length: 1 });
const length1 = meters(20);
const yards = meters.times(0.9144);
const length2 = yards(13);

test("makeUnit", async ({ bench }) => {
  await bench("makeUnit", () => {
    makeUnit("m", { length: 1 });
  }).run();
});

test("makeQuantity", async ({ bench }) => {
  await bench("makeQuantity", () => {
    meters(20);
  }).run();
});

test("plus", async ({ bench }) => {
  await bench("plus", () => {
    length1.plus(length2);
  }).run();
});

test("plus without ts-units", async ({ bench }) => {
  await bench("plus without ts-units", () => {
    return 20 + 11.8872;
  }).run();
});
