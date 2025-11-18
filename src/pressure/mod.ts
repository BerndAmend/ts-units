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

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The pascal, symbol `Pa`, is the SI unit for force. */
    static pascals: Unit<NumberType, dimension.Pressure> = kilograms
      .per(meters)
      .per(seconds.squared())
      .withSymbol("Pa");
  }

  return WithValueType;
}

export const { pascals } = withValueType(NativeArithmetic);
