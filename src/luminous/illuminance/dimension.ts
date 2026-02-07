import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of illuminance.
 *
 * Denoted by `[L]^-2[J]`.
 */
export type Illuminance = {
  length: -2;
  luminousIntensity: 1;
  readonly [Brand]?: unique symbol;
};
export const Illuminance: Illuminance = {
  length: -2,
  luminousIntensity: 1,
};
