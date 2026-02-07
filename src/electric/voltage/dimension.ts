import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of voltage.
 *
 * Denoted by `[M][L]^2[T]^-3[I]^-1`.
 */
export type Voltage = {
  mass: 1;
  length: 2;
  time: -3;
  electricCurrent: -1;
  readonly [Brand]?: unique symbol;
};
export const Voltage: Voltage = {
  mass: 1,
  length: 2,
  time: -3,
  electricCurrent: -1,
};
