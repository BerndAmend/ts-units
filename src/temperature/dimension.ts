import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI base quantity of thermodynamic temperature.
 *
 * Denoted by `[Θ]`.
 */
export type Temperature = { temperature: 1; readonly [Brand]?: unique symbol };
export const Temperature: Temperature = { temperature: 1 };
