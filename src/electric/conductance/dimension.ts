import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of electrical conductance.
 *
 * Denoted by `[M]^-1[L]^-2[T]^3[I]^2`.
 */
export type Conductance = {
  mass: -1;
  length: -2;
  time: 3;
  electricCurrent: 2;
  readonly [Brand]?: unique symbol;
};
export const Conductance: Conductance = {
  mass: -1,
  length: -2,
  time: 3,
  electricCurrent: 2,
};
