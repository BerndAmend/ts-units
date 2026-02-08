import { assertEquals, assertExists } from "@std/assert";
import { allUnits, meters, parse, seconds, sin } from "ts-units";

Deno.test("allUnits array contains expected units", () => {
  assertExists(allUnits);
  assertEquals(Array.isArray(allUnits), true);
  assertEquals(allUnits.length > 0, true);

  // Check for presence of some known units
  const hasMeters = allUnits.some((u) => u.symbol === "m");
  assertEquals(hasMeters, true);

  const hasSeconds = allUnits.some((u) => u.symbol === "s");
  assertEquals(hasSeconds, true);

  // Check that non-units like 'sin' are NOT in allUnits
  // 'sin' doesn't have a symbol, so it wouldn't match anyway if we checked properly.
  // But we can check that everything in allUnits has a symbol.
  for (const unit of allUnits) {
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
  // Let's check length/mod.ts:
  // const kilometers = meters.withSiPrefix("k");
  // withSiPrefix adds prefix to symbol.
  // meters symbol is "m". So "km".
  // Actually, let's verify exact symbol.
});
