import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of acceleration. */
export type Acceleration<NumberType = number> = Quantity<
  NumberType,
  dimension.Acceleration
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { meters } = lengthWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The meter per second, symbol `m/s²`, is the SI unit for acceleration. */
    static metersPerSecondSquared: Unit<NumberType, dimension.Acceleration> =
      meters
        .per(seconds.squared())
        .withSymbol("m/s²");
  }

  return WithValueType;
}

export const {
  metersPerSecondSquared,
} = withValueType(NativeArithmetic);
