import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of capacitance.
 *
 * Denoted by `[M]^-1[L]^-2[T]^4[I]^2`.
 */
export type Capacitance = {
  mass: -1;
  length: -2;
  time: 4;
  electricCurrent: 2;
  readonly [Brand]?: unique symbol;
};
export const Capacitance: Capacitance = {
  mass: -1,
  length: -2,
  time: 4,
  electricCurrent: 2,
};
