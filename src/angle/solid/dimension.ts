import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of solid angle.
 *
 * Denoted by `[1]`.
 */
export type SolidAngle = { readonly [Brand]?: unique symbol };
export const SolidAngle: SolidAngle = {};
