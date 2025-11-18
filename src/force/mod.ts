import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as massWithValueType } from "../mass/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of force. */
export type Force<NumberType = number> = Quantity<NumberType, dimension.Force>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { kilograms } = massWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The newton, symbol `N`, is the SI unit for force. */
    static newtons: Unit<NumberType, dimension.Force> = kilograms
      .times(meters)
      .per(seconds.squared())
      .withSymbol("N");
  }

  return WithValueType;
}

export const { newtons } = withValueType(NativeArithmetic);
