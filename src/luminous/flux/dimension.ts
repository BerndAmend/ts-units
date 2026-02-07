import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of luminous flux.
 *
 * Denoted by `[J]`.
 */
export type LuminousFlux = {
  luminousIntensity: 1;
  readonly [Brand]?: unique symbol;
};
export const LuminousFlux: LuminousFlux = { luminousIntensity: 1 };
