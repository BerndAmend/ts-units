import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { parse } from "../src/parse.ts";
import { centimeters, kilometers, meters } from "../src/length/mod.ts";

describe("parse", () => {
  it("parses simple integers", () => {
    const q = parse("10 m", [meters]);
    expect(q.toString()).toEqual("10 m");
    expect(q.amount).toBe(10);
  });

  it("parses decimals with dot", () => {
    const q = parse("10.5 m", [meters]);
    expect(q.toString()).toEqual("10.5 m");
    expect(q.amount).toBe(10.5);
  });

  it("parses decimals with comma", () => {
    const q = parse("10,5 m", [meters]);
    expect(q.toString()).toEqual("10.5 m");
    expect(q.amount).toBe(10.5);
  });

  it("handles different spacing", () => {
    expect(parse("10m", [meters]).amount).toBe(10);
    expect(parse("10   m", [meters]).amount).toBe(10);
  });

  it("selects correct unit from list", () => {
    const units = [meters, kilometers, centimeters];
    expect(parse("5 km", units).unit.symbol).toBe("km");
    expect(parse("5 cm", units).unit.symbol).toBe("cm");
  });

  it("selects correct unit from object", () => {
    const units = { m: meters, km: kilometers };
    expect(parse("5 km", units).unit.symbol).toBe("km");
  });

  it("throws on unknown unit", () => {
    expect(() => parse("5 ft", [meters])).toThrow('Unknown unit: "ft"');
  });

  it("throws on invalid format", () => {
    expect(() => parse("abc", [meters])).toThrow("Invalid format");
  });

  it("throws on invalid number", () => {
    // This case is tricky with current regex, regex usually catches typical numbers.
    // But "1.2.3 m" might be parsed as number "1.2.3" which parseFloat might handle partially or NaN
    // Let's test "NaN m" explicitly if regex allowed it, but regex expects digits.
    // "1.2.3 m" -> match[1]="1.2.3". parseFloat("1.2.3") -> 1.2
    // So let's try something that matches regex but fails parseFloat?
    // Regex `^([\d.,\s]+)` is very broad.
    // ".."
    expect(() => parse(".. m", [meters])).toThrow("Invalid number");
  });
});
