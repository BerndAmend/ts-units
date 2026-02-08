import { assertEquals } from "@std/assert";
import { parse } from "ts-units";

Deno.test("parse handles degree symbols correctly", () => {
  // Celsius
  const c1 = parse("100 °C");
  assertEquals(c1.amount, 100);
  assertEquals(c1.unit.symbol, "°C");
  assertEquals(c1.toString(), "100 °C");

  // Fahrenheit
  const f1 = parse("451 °F");
  assertEquals(f1.amount, 451);
  assertEquals(f1.unit.symbol, "°F");
  assertEquals(f1.toString(), "451 °F");

  // Angle degrees
  const d1 = parse("180 °");
  assertEquals(d1.amount, 180);
  assertEquals(d1.unit.symbol, "°");
  assertEquals(d1.toString(), "180 °");

  // Check that we can roundtrip
  const c2 = parse(c1.toString());
  assertEquals(c2.amount, 100);
  assertEquals(c2.unit.symbol, "°C");
});
