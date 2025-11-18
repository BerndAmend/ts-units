import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of electrical conductance. */
export type Conductance<NumberType = number> = Quantity<
  NumberType,
  dimension.Conductance
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { amperes } = currentWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The siemens, symbol `S`, is the SI unit for electrical conductance. */
    static siemens: Unit<NumberType, dimension.Conductance> = seconds
      .cubed()
      .times(amperes.squared())
      .per(kilograms)
      .per(meters.squared())
      .withSymbol("S");
  }

  return WithValueType;
}

export const { siemens } = withValueType(NativeArithmetic);
