import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";

/** A quantity of volume. */
export type Volume<NumberType = number> = Quantity<
  NumberType,
  dimension.Volume
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { meters } = lengthWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The cubic meter, symbol `m³`, is the SI unit of area. All other units in
     * this module are defined as scaled values of the cubic meter.
     */
    static cubicMeters: Unit<NumberType, dimension.Volume> = meters
      .cubed()
      .withSymbol("m³");
  }

  return WithValueType;
}

export const { cubicMeters } = withValueType(NativeArithmetic);
