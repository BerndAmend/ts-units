import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of area.
 *
 * Denoted by `[L]^2`.
 */
export type Area = { length: 2; readonly [Brand]?: unique symbol };
export const Area: Area = { length: 2 };
