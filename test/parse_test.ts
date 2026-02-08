import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { parse } from "ts-units";

describe("parse", () => {
  describe("basics", () => {
    it("parses simple integers", () => {
      const q = parse("10 m");
      expect(q.toString()).toEqual("10 m");
      expect(q.amount).toBe(10);
    });

    it("parses decimals with dot", () => {
      const q = parse("10.5 m");
      expect(q.toString()).toEqual("10.5 m");
      expect(q.amount).toBe(10.5);
    });

    it("parses decimals with comma", () => {
      const q = parse("10,5 m");
      expect(q.toString()).toEqual("10.5 m");
      expect(q.amount).toBe(10.5);
    });

    it("handles different spacing", () => {
      expect(parse("10m").amount).toBe(10);
      expect(parse("10   m").amount).toBe(10);
    });

    it("selects correct unit from list", () => {
      expect(parse("5 km").unit.symbol).toBe("km");
      expect(parse("5 cm").unit.symbol).toBe("cm");
    });

    it("throws on unknown unit", () => {
      // "bla" is definitely unknown
      expect(() => parse("5 bla")).toThrow('Unknown unit: "bla"');
    });

    it("throws on invalid format", () => {
      expect(() => parse("abc")).toThrow("Invalid format");
    });

    it("throws on invalid number", () => {
      expect(() => parse(".. m")).toThrow("Invalid number");
    });
  });

  describe("compound units", () => {
    it("parses km/h", () => {
      const q = parse("100 km/h");
      expect(q.amount).toBe(100);
      // Symbol might be constructed differently now, check dimension or scale
      expect(q.unit.dimension).toEqual({ length: 1, time: -1 });
    });

    it("parses m/s", () => {
      const q = parse("10 m/s");
      expect(q.amount).toBe(10);
      expect(q.unit.dimension).toEqual({ length: 1, time: -1 });
    });

    it("parses units with multiplication (space)", () => {
      // "N m" -> Torque or Energy
      const q = parse("10 N m");
      expect(q.amount).toBe(10);
      // N * m = (kg*m/s^2) * m = kg*m^2/s^2 = J
      expect(q.unit.dimension).toEqual({ mass: 1, length: 2, time: -2 });
    });

    it("parses units with * multiplication", () => {
      const q = parse("10 N*m");
      expect(q.amount).toBe(10);
      expect(q.unit.dimension).toEqual({ mass: 1, length: 2, time: -2 });
    });

    it("parses combinations", () => {
      const q = parse("10 kg*m/s^2");
      expect(q.amount).toBe(10);
      // Should be Newtons: kg * m * s^-2
      expect(q.unit.dimension).toEqual({ mass: 1, length: 1, time: -2 });
    });
  });

  describe("powers", () => {
    it("parses squared units (²)", () => {
      const q = parse("10 m²");
      expect(q.amount).toBe(10);
      expect(q.unit.dimension).toEqual({ length: 2 });
    });

    it("parses squared units (^2)", () => {
      const q = parse("10 m^2");
      expect(q.amount).toBe(10);
      expect(q.unit.dimension).toEqual({ length: 2 });
    });

    it("parses cubed units (³)", () => {
      const q = parse("10 m³");
      expect(q.amount).toBe(10);
      expect(q.unit.dimension).toEqual({ length: 3 });
    });

    it("parses cubed units (^3)", () => {
      const q = parse("10 m^3");
      expect(q.amount).toBe(10);
      expect(q.unit.dimension).toEqual({ length: 3 });
    });

    it("parses negative powers", () => {
      const q = parse("10 s^-1");
      expect(q.amount).toBe(10);
      expect(q.unit.dimension).toEqual({ time: -1 });
    });
  });

  describe("SI prefixes", () => {
    it("parses known units with prefixes (km)", () => {
      // km is in the list, so it might use the list one, but if logic falls back or checks list first...
      // logic checks list first.
      const q = parse("10 km");
      expect(q.amount).toBe(10);
      // scale 1000
      expect(q.unit.scale).toBe(1000);
    });

    it("parses unknown units with prefixes (mm)", () => {
      // mm is in list? yes
      const q = parse("10 mm");
      expect(q.amount).toBe(10);
      expect(q.unit.scale).toBe(0.001);
    });

    it("parses derived units with prefixes (nm)", () => {
      // nm is in list.
      const q = parse("1 nm");
      expect(q.unit.scale).toBe(1e-9);
    });

    it("parses constructed prefixes (megameter?)", () => {
      // Mm is NOT in default list (checked mod.ts).
      // M = 1e6. m = meter.
      const q = parse("1 Mm");
      expect(q.amount).toBe(1);
      expect(q.unit.scale).toBe(1e6);
      expect(q.unit.dimension).toEqual({ length: 1 });
    });

    it("parses units with prefix and power (km²)", () => {
      // 1 km² = (10^3 m)^2 = 10^6 m^2
      // km is in list. squared() on km unit.
      // km unit scale = 1000.
      // km.squared() scale = 1000^2 = 1,000,000.
      const q = parse("1 km²");
      expect(q.amount).toBe(1);
      expect(q.unit.scale).toBe(1e6);
    });

    it("parses units with prefix and power constructed (Mm²)", () => {
      // Mm not in list.
      // base=Mm -> prefix=M, base=m. baseUnit=m*1e6.
      // power=2. (m*1e6)^2 = m^2 * 1e12.
      const q = parse("1 Mm²");
      expect(q.unit.scale).toBe(1e12);
    });
  });

  describe("edge cases", () => {
    it("parses 1/s", () => {
      const q = parse("50 1/s");
      expect(q.amount).toBe(50);
      expect(q.unit.dimension).toEqual({ time: -1 });
    });

    it("parses 1/min", () => {
      const q = parse("60 1/min");
      // 60 * (1/min) = 60 * 1/(60s) = 1/s = 1 Hz.
      // unit(1/min) scale should be 1/60 ?
      // min scale = 60. reciprocal = 1/60.
      expect(q.valueOf()).toBeCloseTo(1);
    });
  });
});
