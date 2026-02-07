import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of acceleration.
 *
 * Denoted by `[L][T]^-2`.
 */
export type Acceleration = {
  length: 1;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const Acceleration: Acceleration = { length: 1, time: -2 };
