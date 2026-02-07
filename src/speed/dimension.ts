import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of speed.
 *
 * Denoted by `[L][T]^-1`.
 */
export type Speed = { length: 1; time: -1; readonly [Brand]?: unique symbol };
export const Speed: Speed = { length: 1, time: -1 };
