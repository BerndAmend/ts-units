import { hours, minutes, msec, nanoseconds, s, usec } from "../src/time/mod.ts";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("time smoke tests", () => {
  const equalUnits = [
    { a: nanoseconds(1234), b: usec(1.234) },
    { a: usec(1234), b: msec(1.234) },
    { a: msec(1234), b: s(1.234) },
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    { a: s(1234), b: minutes(20.566666666666667) },
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
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
