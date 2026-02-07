import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of acceleration. */
export type Acceleration<NumberType = number> = Quantity<
  NumberType,
  dimension.Acceleration
>;

/** A unit of acceleration. */
type AccelerationUnit<T> = Unit<T, dimension.Acceleration>;

/**
 * Creates acceleration units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with acceleration unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  metersPerSecondSquared: AccelerationUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The meter per second squared, symbol `m/s²`, is the SI unit for acceleration. */
  const metersPerSecondSquared: Unit<NumberType, dimension.Acceleration> =
    meters.per(seconds.squared()).withSymbol("m/s²");

  return { metersPerSecondSquared };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The meter per second squared, symbol `m/s²`, is the SI unit for acceleration. */
export const metersPerSecondSquared = _units.metersPerSecondSquared;
