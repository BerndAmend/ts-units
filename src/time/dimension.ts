import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI base quantity of time.
 *
 * Denoted by `[T]`.
 */
export type Time = { time: 1; readonly [Brand]?: unique symbol };
export const Time: Time = { time: 1 };
