import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of electrical capacitance. */
export type Capacitance<NumberType = number> = Quantity<
  NumberType,
  dimension.Capacitance
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The farad, symbol `F`, is the SI unit for electrical capacitance. */
    static farads: Unit<NumberType, dimension.Capacitance> = seconds
      .squared()
      .squared()
      .times(amperes.squared())
      .per(kilograms)
      .per(meters.squared())
      .withSymbol("F");

    static microfarads = WithValueType.farads.withSiPrefix("μ");
    static nanofarads = WithValueType.farads.withSiPrefix("n");
    static picofarads = WithValueType.farads.withSiPrefix("p");
  }

  return WithValueType;
}

export const { farads, microfarads, nanofarads, picofarads } = withValueType(
  NativeArithmetic,
);
