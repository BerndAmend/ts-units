import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as intensityWithValueType } from "../intensity/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";

/** A quantity of illuminance. */
export type Illuminance<NumberType = number> = Quantity<
  NumberType,
  dimension.Illuminance
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { candelas } = intensityWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The lux, symbol `lx`, is the SI unit for illuminance. */
    static lux: Unit<NumberType, dimension.Illuminance> = candelas
      .per(meters.squared())
      .withSymbol("lx");
  }

  return WithValueType;
}

export const { lux } = withValueType(NativeArithmetic);
