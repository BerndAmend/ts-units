import type { Brand } from "../../dimension.ts";

/**
 * The dimensions of the SI derived quantity of radioactive dose.
 *
 * Denoted by `[L]^2[T]^-2`.
 */
export type Dose = { length: 2; time: -2; readonly [Brand]?: unique symbol };
export const Dose: Dose = { length: 2, time: -2 };

export type AbsorbedDose = {
  length: 2;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const AbsorbedDose: AbsorbedDose = { length: 2, time: -2 };

export type EquivalentDose = {
  length: 2;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const EquivalentDose: EquivalentDose = { length: 2, time: -2 };
