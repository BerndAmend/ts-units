import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of electric charge. */
export type Charge<NumberType = number> = Quantity<
  NumberType,
  dimension.Charge
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { amperes } = currentWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The coulomb, symbol `C`, is the SI unit for electric charge. */
    static coulombs: Unit<NumberType, dimension.Charge> = amperes
      .times(seconds)
      .withSymbol("C");
  }

  return WithValueType;
}

export const { coulombs } = withValueType(NativeArithmetic);
