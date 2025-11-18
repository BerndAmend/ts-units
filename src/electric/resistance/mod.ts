import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of electrical resistance. */
export type Resistance<NumberType = number> = Quantity<
  NumberType,
  dimension.Resistance
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The ohm, symbol `Ω`, is the SI unit for electrical resistance. */
    static ohms: Unit<NumberType, dimension.Resistance> = kilograms
      .times(meters.squared())
      .per(seconds.cubed())
      .per(amperes.squared())
      .withSymbol("Ω");
  }

  return WithValueType;
}

export const { ohms } = withValueType(NativeArithmetic);
