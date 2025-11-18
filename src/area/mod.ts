import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";

/** A quantity of area. */
export type Area<NumberType = number> = Quantity<NumberType, dimension.Area>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { meters } = lengthWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The square meter, symbol `m²`, is the SI unit of area. All other units in
     * this module are defined as scaled values of the square meter.
     */
    static squareMeters: Unit<NumberType, dimension.Area> = meters
      .squared()
      .withSymbol("m²");
  }
  return WithValueType;
}

export const { squareMeters } = withValueType(NativeArithmetic);
