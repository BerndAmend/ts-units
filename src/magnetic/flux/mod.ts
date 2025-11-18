import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../../electric/current";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of magnetic flux. */
export type Flux<NumberType = number> = Quantity<NumberType, dimension.Flux>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The weber, symbol `Wb`, is the SI unit for magnetic flux. */
    static webers: Unit<NumberType, dimension.Flux> = kilograms
      .times(meters.squared())
      .per(seconds.squared())
      .per(amperes)
      .withSymbol("Wb");
  }

  return WithValueType;
}

export const { webers } = withValueType(NativeArithmetic);
