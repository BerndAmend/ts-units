import { celsius, fahrenheit, kelvin } from "ts-units";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("temperature smoke tests", () => {
  const equalUnits = [
    { a: kelvin(0), b: celsius(-273.15) },
    { a: kelvin(0), b: fahrenheit(-459.67) },
    { a: kelvin(294.15), b: celsius(21) },
    { a: celsius(0), b: fahrenheit(32) },
    { a: celsius(100), b: fahrenheit(212) },
    { a: fahrenheit(451), b: celsius(232.778) },
  ];

  equalUnits.forEach(({ a, b }) => {
    it(`${a.toString()} equals ${b.toString()}`, () => {
      expect(a.in(b.unit).amount).toBeCloseTo(b.amount, 1e-3);
    });

    it(`${b.toString()} equals ${a.toString()}`, () => {
      expect(b.in(a.unit).amount).toBeCloseTo(a.amount, 1e-3);
    });
  });
});
