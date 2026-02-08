import { centimeters, percent, permille, permyriad, scalar } from "ts-units";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("scalar", () => {
  describe("smoke tests", () => {
    const equalUnits = [
      { a: scalar(1), b: percent(100) },
      { a: scalar(1), b: permille(1000) },
      { a: scalar(1), b: permyriad(10000) },
      { a: scalar(0.01), b: percent(1) },
      { a: scalar(0.001), b: permille(1) },
      { a: scalar(0.0001), b: permyriad(1) },
    ];

    equalUnits.forEach(({ a, b }) => {
      it(`${a.toString()} equals ${b.toString()}`, () => {
        expect(a.in(b.unit).amount).toBeCloseTo(b.amount, 1e-6);
      });

      it(`${b.toString()} equals ${a.toString()}`, () => {
        expect(b.in(a.unit).amount).toBeCloseTo(a.amount, 1e-6);
      });
    });
  });

  describe("times units", () => {
    it("scales other units", () => {
      const length = percent(3).times(centimeters(100));
      expect(length.amount).toBeCloseTo(3, 0.001);
      expect(length.unit).toEqual(centimeters);
    });
  });
});
