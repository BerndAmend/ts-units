import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI base quantity of mass.
 *
 * Denoted by `[M]`.
 */
export type Mass = { mass: 1; readonly [Brand]?: unique symbol };
export const Mass: Mass = { mass: 1 };
