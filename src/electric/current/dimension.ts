import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI base quantity of electric current.
 *
 * Denoted by `[I]`.
 */
export type Current = {
  electricCurrent: 1;
  readonly [Brand]?: unique symbol;
};
export const Current: Current = { electricCurrent: 1 };
