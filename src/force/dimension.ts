import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of force.
 *
 * Denoted by `[M][L][T]^-2`.
 */
export type Force = {
  mass: 1;
  length: 1;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const Force: Force = { mass: 1, length: 1, time: -2 };
