import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as massWithValueType } from "../mass/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of pressure. */
export type Pressure<NumberType = number> = Quantity<
  NumberType,
  dimension.Pressure
>;

/** A unit of pressure. */
type PressureUnit<T> = Unit<T, dimension.Pressure>;

/**
 * Creates pressure units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with pressure unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  pascals: PressureUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The pascal, symbol `Pa`, is the SI unit for pressure. */
  const pascals: Unit<NumberType, dimension.Pressure> = kilograms
    .per(meters)
    .per(seconds.squared())
    .withSymbol("Pa");

  return { pascals };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The pascal, symbol `Pa`, is the SI unit for pressure. */
export const pascals = _units.pascals;
