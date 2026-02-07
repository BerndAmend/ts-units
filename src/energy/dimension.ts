import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of energy.
 *
 * Denoted by `[M][L]^2[T]^-2`.
 */
export type Energy = {
  mass: 1;
  length: 2;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const Energy: Energy = { mass: 1, length: 2, time: -2 };
