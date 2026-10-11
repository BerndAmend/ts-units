import { expect, it } from "vitest";
import { type Acceleration, meters, metersPerSecondSquared, seconds } from "#mod";

it("acceleration tests", () => {
  const gravityofEarth: Acceleration = metersPerSecondSquared(9.81);
  expect(gravityofEarth.amount).toEqual(9.81);
  expect(gravityofEarth.amount).toEqual(meters(9.81).per(seconds(1).squared()).amount);
});
