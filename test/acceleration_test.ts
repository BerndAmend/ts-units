import {
  type Acceleration,
  meters,
  metersPerSecondSquared,
  seconds,
} from "ts-units";
import { assertEquals } from "@std/assert";

Deno.test("acceleration tests", () => {
  const gravityofEarth: Acceleration = metersPerSecondSquared(9.81);
  assertEquals(
    gravityofEarth.amount,
    9.81,
  );
  assertEquals(
    gravityofEarth.amount,
    meters(9.81).per(seconds(1).squared()).amount,
  );
});
