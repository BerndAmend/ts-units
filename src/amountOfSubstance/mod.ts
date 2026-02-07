import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../unit.ts";

/** A quantity of amount of substance. */
export type AmountOfSubstance<NumberType = number> = Quantity<
  NumberType,
  dimension.AmountOfSubstance
>;

/** A unit of amount of substance. */
type AmountOfSubstanceUnit<T> = Unit<T, dimension.AmountOfSubstance>;

/**
 * Creates amount of substance units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with amount of substance unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  mole: AmountOfSubstanceUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /**
   * The mole, symbol `mol`, is the SI base unit of amount of substance.
   *
   * One mole contains exactly 6.022 140 76 × 10²³ elementary entities.
   */
  const mole = makeUnit("mol", dimension.AmountOfSubstance);

  return { mole };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The mole, symbol `mol`, is the SI base unit of amount of substance.
 */
export const mole = _units.mole;
