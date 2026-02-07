import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of angular speed.
 *
 * Denoted by `[L][T]^-1`.
 */
export type AngularSpeed = {
  time: -1;
  readonly [Brand]?: unique symbol;
};
export const AngularSpeed: AngularSpeed = { time: -1 };
