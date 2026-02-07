import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../../unit.ts";

/** A quantity of luminous intensity. */
export type Intensity<NumberType = number> = Quantity<
  NumberType,
  dimension.Intensity
>;

/** A unit of luminous intensity. */
type IntensityUnit<T> = Unit<T, dimension.Intensity>;

/**
 * Creates luminous intensity units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with luminous intensity unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  candelas: IntensityUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /**
   * The candela, symbol `cd`, is the SI base unit of luminous intensity.
   */
  const candelas = makeUnit("cd", dimension.Intensity);

  return { candelas };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The candela, symbol `cd`, is the SI base unit of luminous intensity.
 */
export const candelas = _units.candelas;
