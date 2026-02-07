import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of electric charge.
 *
 * Denoted by `[T][I]`.
 */
export type Charge = {
  time: 1;
  electricCurrent: 1;
  readonly [Brand]?: unique symbol;
};
export const Charge: Charge = { time: 1, electricCurrent: 1 };
