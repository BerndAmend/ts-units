import { assertEquals, assertExists } from "@std/assert";
import { allUnits, meters, parse, seconds, sin } from "ts-units";

Deno.test("allUnits object contains expected units", () => {
  assertExists(allUnits);
  assertEquals(typeof allUnits, "object");
  assertEquals(Array.isArray(allUnits), false);

  const unitsArray = Object.values(allUnits);
  assertEquals(unitsArray.length > 0, true);

  // Check for presence of some known units
  const hasMeters = unitsArray.some((u) => u.symbol === "m");
  assertEquals(hasMeters, true);

  const hasSeconds = unitsArray.some((u) => u.symbol === "s");
  assertEquals(hasSeconds, true);

  // Check that properties of the object are units
  for (const unit of unitsArray) {
    assertExists(unit.symbol, "Unit should have a symbol");
    assertExists(unit.dimension, "Unit should have a dimension");
  }
});

Deno.test("Exports work correctly", () => {
  assertExists(meters);
  assertExists(seconds);
  // Functions should also be exported
  assertExists(sin);
});

Deno.test("parse works with allUnits", () => {
  const q1 = parse("10 m");
  assertEquals(q1.amount, 10);
  assertEquals(q1.unit.symbol, "m");

  const q2 = parse("5.5 km");
  assertEquals(q2.amount, 5.5);
  assertEquals(q2.unit.symbol, "km");
});
