import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of speed. */
export type Speed<NumberType = number> = Quantity<NumberType, dimension.Speed>;

/** A unit of speed. */
type SpeedUnit<T> = Unit<T, dimension.Speed>;

/**
 * Creates speed units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with speed unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  metersPerSecond: SpeedUnit<NumberType>;
  kilometersPerHour: SpeedUnit<NumberType>;
  milesPerHour: SpeedUnit<NumberType>;
  knots: SpeedUnit<NumberType>;
  feetPerSecond: SpeedUnit<NumberType>;
} {
  const { meters, kilometers, miles, nauticalMiles, feet } =
    lengthWithValueType(arithmetic);
  const { seconds, hours } = timeWithValueType(arithmetic);

  /** The meter per second, symbol `m/s`, is the SI unit for speed. */
  const metersPerSecond: Unit<NumberType, dimension.Speed> = meters
    .per(seconds)
    .withSymbol("m/s");

  /** Kilometers per hour. */
  const kilometersPerHour: Unit<NumberType, dimension.Speed> = kilometers
    .per(hours)
    .withSymbol("km/h");

  /** Miles per hour. */
  const milesPerHour: Unit<NumberType, dimension.Speed> = miles
    .per(hours)
    .withSymbol("mph");

  /** Knots (nautical miles per hour). */
  const knots: Unit<NumberType, dimension.Speed> = nauticalMiles
    .per(hours)
    .withSymbol("kn");

  /** Feet per second. */
  const feetPerSecond: Unit<NumberType, dimension.Speed> = feet
    .per(seconds)
    .withSymbol("fps");

  return {
    metersPerSecond,
    kilometersPerHour,
    milesPerHour,
    knots,
    feetPerSecond,
  };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The meter per second, symbol `m/s`, is the SI unit for speed. */
export const metersPerSecond = _units.metersPerSecond;

/** Kilometers per hour. */
export const kilometersPerHour = _units.kilometersPerHour;

/** Miles per hour. */
export const milesPerHour = _units.milesPerHour;

/** Knots (nautical miles per hour). */
export const knots = _units.knots;

/** Feet per second. */
export const feetPerSecond = _units.feetPerSecond;
