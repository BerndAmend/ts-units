import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";

/** A quantity of area. */
export type Area<NumberType = number> = Quantity<NumberType, dimension.Area>;

/** A unit of area. */
type AreaUnit<T> = Unit<T, dimension.Area>;

/**
 * Creates area units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with area unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  squareMeters: AreaUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);

  /**
   * The square meter, symbol `m²`, is the SI unit of area. All other units in
   * this module are defined as scaled values of the square meter.
   */
  const squareMeters: Unit<NumberType, dimension.Area> = meters
    .squared()
    .withSymbol("m²");

  return { squareMeters };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The square meter, symbol `m²`, is the SI unit of area.
 */
export const squareMeters = _units.squareMeters;
