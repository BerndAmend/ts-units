import { expect, it } from "vitest";
import { allUnits, meters, parse, seconds, sin } from "#mod";

it("allUnits object contains expected units", () => {
  expect(allUnits).toBeDefined();
  expect(typeof allUnits).toEqual("object");
  expect(Array.isArray(allUnits)).toEqual(false);

  const unitsArray = Object.values(allUnits);
  expect(unitsArray.length > 0).toEqual(true);

  // Check for presence of some known units
  const hasMeters = unitsArray.some((u) => u.symbol === "m");
  expect(hasMeters).toEqual(true);

  const hasSeconds = unitsArray.some((u) => u.symbol === "s");
  expect(hasSeconds).toEqual(true);

  // Check that properties of the object are units
  for (const unit of unitsArray) {
    expect(unit.symbol).toBeDefined();
    expect(unit.dimension).toBeDefined();
  }
});

it("Exports work correctly", () => {
  expect(meters).toBeDefined();
  expect(seconds).toBeDefined();
  // Functions should also be exported
  expect(sin).toBeDefined();
});

it("parse works with allUnits", () => {
  const q1 = parse("10 m");
  expect(q1.amount).toEqual(10);
  expect(q1.unit.symbol).toEqual("m");

  const q2 = parse("5.5 km");
  expect(q2.amount).toEqual(5.5);
  expect(q2.unit.symbol).toEqual("km");
});
