import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as massWithValueType } from "../mass/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of power. */
export type Power<NumberType = number> = Quantity<NumberType, dimension.Power>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The watt, symbol `W`, is the SI unit for power. */
    static watts: Unit<NumberType, dimension.Power> = kilograms
      .times(meters.squared())
      .per(seconds.cubed())
      .withSymbol("W");
  }

  return WithValueType;
}

export const { watts } = withValueType(NativeArithmetic);
