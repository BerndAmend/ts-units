import type { Brand } from "../dimension.ts";

/**
 * The dimensions of the SI base quantity of amount of substance.
 *
 * Denoted by `[N]`.
 */
export type AmountOfSubstance = {
  amountOfSubstance: 1;
  readonly [Brand]?: unique symbol;
};
export const AmountOfSubstance: AmountOfSubstance = { amountOfSubstance: 1 };
