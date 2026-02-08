import {
  type AngularSpeed,
  degrees,
  degreesPerSecond,
  hours,
  radians,
  radiansPerSecond,
  seconds,
} from "ts-units";
import { expect } from "@std/expect";

Deno.test("angular speed tests", () => {
  const _v: AngularSpeed[] = [
    degreesPerSecond(90),
    radiansPerSecond(1),
    degrees(90).per(seconds(1)),
    radians(1).per(hours(1)),
  ];
  const v1: AngularSpeed = degreesPerSecond(90);
  expect(v1.amount).toBe(90);
  expect(v1.in(radiansPerSecond).amount).toBeCloseTo(1.570796326794897);
});
