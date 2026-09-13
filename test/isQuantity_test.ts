import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import {
  celsius,
  isQuantity,
  kilometersPerHour,
  meters,
  parse,
  seconds,
} from "ts-units";

describe("isQuantity", () => {
  describe("quantities", () => {
    it("returns true for a simple quantity", () => {
      expect(isQuantity(meters(5))).toBe(true);
    });

    it("returns true for a derived quantity", () => {
      expect(isQuantity(kilometersPerHour(100))).toBe(true);
    });

    it("returns true for a quantity with an offset unit", () => {
      expect(isQuantity(celsius(20))).toBe(true);
    });

    it("returns true for a dimensionless quantity", () => {
      expect(isQuantity(meters(5).per(meters(2)))).toBe(true);
    });

    it("returns true for the result of arithmetic", () => {
      expect(isQuantity(meters(5).per(seconds(2)))).toBe(true);
    });

    it("returns true for a parsed quantity", () => {
      expect(isQuantity(parse("5 m"))).toBe(true);
    });

    it("returns true for a quantity-like object", () => {
      const fake = {
        amount: 1,
        value: () => 1,
        in: () => fake,
        unit: () => fake,
        dimension: {},
      };
      expect(isQuantity(fake)).toBe(true);
    });
  });

  describe("non-quantities", () => {
    it("returns false for numbers", () => {
      expect(isQuantity(5)).toBe(false);
    });

    it("returns false for strings", () => {
      expect(isQuantity("5 m")).toBe(false);
    });

    it("returns false for booleans", () => {
      expect(isQuantity(true)).toBe(false);
    });

    it("returns false for null", () => {
      expect(isQuantity(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isQuantity(undefined)).toBe(false);
    });

    it("returns false for plain objects", () => {
      expect(isQuantity({})).toBe(false);
    });

    it("returns false for arrays", () => {
      expect(isQuantity([meters(1)])).toBe(false);
    });

    it("returns false for units", () => {
      expect(isQuantity(meters)).toBe(false);
    });

    it("returns false for functions", () => {
      expect(isQuantity(() => meters(1))).toBe(false);
    });

    it("returns false for objects missing a quantity member", () => {
      expect(isQuantity({ amount: 1, value: () => 1, dimension: {} })).toBe(
        false,
      );
      expect(
        isQuantity({ amount: 1, in: () => 1, unit: () => 1, dimension: {} }),
      ).toBe(false);
    });
  });
});
