import {
  hours,
  microseconds,
  milliseconds,
  minutes,
  nanoseconds,
  seconds,
} from "ts-units";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("time smoke tests", () => {
  const equalUnits = [
    { a: nanoseconds(1234), b: microseconds(1.234) },
    { a: microseconds(1234), b: milliseconds(1.234) },
    { a: milliseconds(1234), b: seconds(1.234) },
    { a: seconds(1234), b: minutes(20.566666666666667) },
    { a: minutes(1234), b: hours(20.566666666666667) },
  ];

  equalUnits.forEach(({ a, b }) => {
    it(`${a.toString()} equals ${b.toString()}`, () => {
      expect(a.in(b.unit).amount).toBeCloseTo(b.amount, 1e-10);
    });

    it(`${b.toString()} equals ${a.toString()}`, () => {
      expect(b.in(a.unit).amount).toBeCloseTo(a.amount, 1e-10);
    });
  });
});
