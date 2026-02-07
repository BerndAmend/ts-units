import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of magnetic induction.
 *
 * Denoted by `[M][T]^-2[I]^-1`.
 */
export type MagneticInduction = {
  mass: 1;
  time: -2;
  electricCurrent: -1;
  readonly [Brand]?: unique symbol;
};
export const MagneticInduction: MagneticInduction = {
  mass: 1,
  time: -2,
  electricCurrent: -1,
};
