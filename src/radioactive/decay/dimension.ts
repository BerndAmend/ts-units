import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of radioactivity.
 *
 * Denoted by `[T]^-1`.
 */
export type Radioactivity = { time: -1; readonly [Brand]?: unique symbol };
export const Radioactivity: Radioactivity = { time: -1 };
