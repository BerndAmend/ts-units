import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { type Geometric, NativeGeometric } from "../geometric.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as angleWithValueType } from "../angle/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of angular speed. */
export type AngularSpeed<NumberType = number> = Quantity<
  NumberType,
  dimension.AngularSpeed
>;

/** A unit of angular speed. */
type AngularSpeedUnit<T> = Unit<T, dimension.AngularSpeed>;

/**
 * Creates angular speed units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @param geometric The geometric implementation to use.
 * @returns An object with angular speed unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
  geometric: Geometric<NumberType>,
): {
  radiansPerSecond: AngularSpeedUnit<NumberType>;
  degreesPerSecond: AngularSpeedUnit<NumberType>;
} {
  const { radians, degrees } = angleWithValueType(arithmetic, geometric);
  const { seconds } = timeWithValueType(arithmetic);

  /** Radians per second. */
  const radiansPerSecond: Unit<NumberType, dimension.AngularSpeed> = radians
    .per(seconds)
    .withSymbol("rad/s");

  /** Degrees per second. */
  const degreesPerSecond: Unit<NumberType, dimension.AngularSpeed> = degrees
    .per(seconds)
    .withSymbol("°/s");

  return { radiansPerSecond, degreesPerSecond };
}

const _units: {
  radiansPerSecond: Unit<number, dimension.AngularSpeed>;
  degreesPerSecond: Unit<number, dimension.AngularSpeed>;
} = withValueType(NativeArithmetic, NativeGeometric);

/** Radians per second. */
export const radiansPerSecond = _units.radiansPerSecond;

/** Degrees per second. */
export const degreesPerSecond = _units.degreesPerSecond;
