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
  milligrams: MassUnit<NumberType>;
  micrograms: MassUnit<NumberType>;
  tonnes: MassUnit<NumberType>;
  pounds: MassUnit<NumberType>;
  ounces: MassUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /**
   * The kilogram, symbol `kg` is the SI base unit of mass. All other units in
   * this module are defined as scaled values of the kilogram.
   */
  const kilograms = makeUnit("kg", dimension.Mass);

  /** One gram equals 0.001 kilograms. */
  const grams = kilograms.times(1e-3).withSymbol("g");

  /** One milligram equals 0.000001 kilograms. */
  const milligrams = kilograms.times(1e-6).withSymbol("mg");

  /** One microgram equals 1e-9 kilograms. */
  const micrograms = kilograms.times(1e-9).withSymbol("μg");

  /** One tonne (metric ton) equals 1000 kilograms. */
  const tonnes = kilograms.times(1000).withSymbol("t");

  /** One pound equals approximately 0.4536 kilograms. */
  const pounds = kilograms.times(0.45359237).withSymbol("lb");

  /** One ounce equals 1/16 of a pound. */
  const ounces = pounds.per(16).withSymbol("oz");

  return { kilograms, grams, milligrams, micrograms, tonnes, pounds, ounces };
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

/** One milligram equals 0.000001 kilograms. */
export const milligrams = _units.milligrams;

/** One microgram equals 1e-9 kilograms. */
export const micrograms = _units.micrograms;

/** One tonne (metric ton) equals 1000 kilograms. */
export const tonnes = _units.tonnes;

/** One pound equals approximately 0.4536 kilograms. */
export const pounds = _units.pounds;

/** One ounce equals 1/16 of a pound. */
export const ounces = _units.ounces;
