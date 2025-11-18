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

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The volt, symbol `V`, is the SI unit for voltage. */
    static volts: Unit<NumberType, dimension.Voltage> = kilograms
      .times(meters.squared())
      .per(seconds.cubed())
      .per(amperes)
      .withSymbol("V");
  }

  return WithValueType;
}

export const { volts } = withValueType(NativeArithmetic);
