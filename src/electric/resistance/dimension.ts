import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of electric resistance.
 *
 * Denoted by `[M][L]^2[T]^-3[I]^-2`.
 */
export type Resistance = {
  mass: 1;
  length: 2;
  time: -3;
  electricCurrent: -2;
  readonly [Brand]?: unique symbol;
};
export const Resistance: Resistance = {
  mass: 1,
  length: 2,
  time: -3,
  electricCurrent: -2,
};
