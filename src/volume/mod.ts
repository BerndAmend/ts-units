import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";

/** A quantity of volume. */
export type Volume<NumberType = number> = Quantity<
  NumberType,
  dimension.Volume
>;

/** A unit of volume. */
type VolumeUnit<T> = Unit<T, dimension.Volume>;

/**
 * Creates volume units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with volume unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  cubicMeters: VolumeUnit<NumberType>;
  liters: VolumeUnit<NumberType>;
  milliliters: VolumeUnit<NumberType>;
  gallons: VolumeUnit<NumberType>;
  cups: VolumeUnit<NumberType>;
  fluidOunces: VolumeUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);

  /**
   * The cubic meter, symbol `m³`, is the SI unit of volume. All other units in
   * this module are defined as scaled values of the cubic meter.
   */
  const cubicMeters: Unit<NumberType, dimension.Volume> = meters
    .cubed()
    .withSymbol("m³");

  /** One liter equals 0.001 cubic meters. */
  const liters = cubicMeters.times(0.001).withSymbol("L");

  /** One milliliter equals 0.001 liters. */
  const milliliters = liters.times(0.001).withSymbol("mL");

  /** One US gallon equals 3.785411784 liters. */
  const gallons = liters.times(3.785411784).withSymbol("gal");

  /** One US cup equals 236.588 milliliters. */
  const cups = milliliters.times(236.588).withSymbol("cup");

  /** One US fluid ounce equals 29.5735 milliliters. */
  const fluidOunces = milliliters.times(29.5735).withSymbol("fl oz");

  return { cubicMeters, liters, milliliters, gallons, cups, fluidOunces };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The cubic meter, symbol `m³`, is the SI unit of volume.
 */
export const cubicMeters = _units.cubicMeters;

/** One liter equals 0.001 cubic meters. */
export const liters = _units.liters;

/** One milliliter equals 0.001 liters. */
export const milliliters = _units.milliliters;

/** One US gallon equals 3.785411784 liters. */
export const gallons = _units.gallons;

/** One US cup equals 236.588 milliliters. */
export const cups = _units.cups;

/** One US fluid ounce equals 29.5735 milliliters. */
export const fluidOunces = _units.fluidOunces;
