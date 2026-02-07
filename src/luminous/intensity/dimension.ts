import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI base quantity of luminous intensity.
 *
 * Denoted by `[J]`.
 */
export type Intensity = {
  luminousIntensity: 1;
  readonly [Brand]?: unique symbol;
};
export const Intensity: Intensity = { luminousIntensity: 1 };
