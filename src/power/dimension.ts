import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of power.
 *
 * Denoted by `[M][L]^2[T]^-3`.
 */
export type Power = {
  mass: 1;
  length: 2;
  time: -3;
  readonly [Brand]?: unique symbol;
};
export const Power: Power = { mass: 1, length: 2, time: -3 };
