import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI derived quantity of frequency.
 *
 * Denoted by `[T]^-1`.
 */
export type Frequency = { time: -1; readonly [Brand]?: unique symbol };
export const Frequency: Frequency = { time: -1 };
