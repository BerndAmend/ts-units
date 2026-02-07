import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../unit.ts";

/** A quantity of mass. */
export type Mass<NumberType = number> = Quantity<NumberType, dimension.Mass>;

/** A unit of mass. */
type MassUnit<T> = Unit<T, dimension.Mass>;

/**
 * Creates mass units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with mass unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  kilograms: MassUnit<NumberType>;
  grams: MassUnit<NumberType>;
  pounds: MassUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /**
   * The kilogram, symbol `kg` is the SI base unit of mass. All other units in
   * this module are defined as scaled values of the kilogram.
   */
  const kilograms = makeUnit("kg", dimension.Mass);

  /** One gram equals 0.001 kilograms. */
  const grams = kilograms.times(1e-3).withSymbol("g");

  /** One pound equals approximately 0.4536 kilograms. */
  const pounds = kilograms.times(4.5359237e-1).withSymbol("lb");

  return { kilograms, grams, pounds };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The kilogram, symbol `kg` is the SI base unit of mass.
 */
export const kilograms = _units.kilograms;

/** One gram equals 0.001 kilograms. */
export const grams = _units.grams;
