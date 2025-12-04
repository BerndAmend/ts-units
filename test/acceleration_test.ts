import {
  type Acceleration,
  metersPerSecondSquared,
} from "../src/acceleration/mod.ts";
import { meters } from "../src/length/mod.ts";
import { seconds } from "../src/time/mod.ts";
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
