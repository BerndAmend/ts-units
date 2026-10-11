import { expect, it } from "vitest";
import { parse } from "#mod";

it("parse handles degree symbols correctly", () => {
  // Celsius
  const c1 = parse("100 °C");
  expect(c1.amount).toEqual(100);
  expect(c1.unit.symbol).toEqual("°C");
  expect(c1.toString()).toEqual("100 °C");

  // Fahrenheit
  const f1 = parse("451 °F");
  expect(f1.amount).toEqual(451);
  expect(f1.unit.symbol).toEqual("°F");
  expect(f1.toString()).toEqual("451 °F");

  // Angle degrees
  const d1 = parse("180 °");
  expect(d1.amount).toEqual(180);
  expect(d1.unit.symbol).toEqual("°");
  expect(d1.toString()).toEqual("180 °");

  // Check that we can roundtrip
  const c2 = parse(c1.toString());
  expect(c2.amount).toEqual(100);
  expect(c2.unit.symbol).toEqual("°C");
});
