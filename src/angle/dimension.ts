import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of angle.
 *
 * Denoted by `[1]`.
 */
export type Angle = { readonly [Brand]?: unique symbol };
export const Angle: Angle = {};
