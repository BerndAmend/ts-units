import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of pressure.
 *
 * Denoted by `[M][L]^-1[T]^-2`.
 */
export type Pressure = {
  mass: 1;
  length: -1;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const Pressure: Pressure = { mass: 1, length: -1, time: -2 };
