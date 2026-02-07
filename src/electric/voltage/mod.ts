import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of voltage. */
export type Voltage<NumberType = number> = Quantity<
  NumberType,
  dimension.Voltage
>;

/** A unit of voltage. */
type VoltageUnit<T> = Unit<T, dimension.Voltage>;

/**
 * Creates voltage units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with voltage unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  volts: VoltageUnit<NumberType>;
} {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The volt, symbol `V`, is the SI unit for voltage. */
  const volts: Unit<NumberType, dimension.Voltage> = kilograms
    .times(meters.squared())
    .per(seconds.cubed())
    .per(amperes)
    .withSymbol("V");

  return { volts };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The volt, symbol `V`, is the SI unit for voltage. */
export const volts = _units.volts;
