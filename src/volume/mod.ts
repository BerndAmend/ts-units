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
} {
  const { meters } = lengthWithValueType(arithmetic);

  /**
   * The cubic meter, symbol `m³`, is the SI unit of volume. All other units in
   * this module are defined as scaled values of the cubic meter.
   */
  const cubicMeters: Unit<NumberType, dimension.Volume> = meters
    .cubed()
    .withSymbol("m³");

  return { cubicMeters };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The cubic meter, symbol `m³`, is the SI unit of volume.
 */
export const cubicMeters = _units.cubicMeters;
