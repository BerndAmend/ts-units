import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI base quantity of length.
 *
 * Denoted by `[L]`.
 */
export type Length = { length: 1; readonly [Brand]?: unique symbol };
export const Length: Length = { length: 1 };
