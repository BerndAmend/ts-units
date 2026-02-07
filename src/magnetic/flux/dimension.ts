import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of magnetic flux.
 *
 * Denoted by `[M][L]^2[T]^-2[I]^-1`.
 */
export type MagneticFlux = {
  mass: 1;
  length: 2;
  time: -2;
  electricCurrent: -1;
  readonly [Brand]?: unique symbol;
};
export const MagneticFlux: MagneticFlux = {
  mass: 1,
  length: 2,
  time: -2,
  electricCurrent: -1,
};
