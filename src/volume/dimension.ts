import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of volume.
 *
 * Denoted by `[L]^3`.
 */
export type Volume = { length: 3; readonly [Brand]?: unique symbol };
export const Volume: Volume = { length: 3 };
