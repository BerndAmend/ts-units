import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as intensityWithValueType } from "../intensity/mod.ts";
import { withValueType as solidAngleWithValueType } from "../../angle/solid/mod.ts";

/** A quantity of luminous flux. */
export type Flux<NumberType = number> = Quantity<NumberType, dimension.Flux>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { candelas } = intensityWithValueType(arithmetic);
  const { steradians } = solidAngleWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The lumen, symbol `lm`, is the SI unit for luminous flux. */
    static lumens: Unit<NumberType, dimension.Flux> = candelas
      .times(steradians)
      .withSymbol("lm");
  }

  return WithValueType;
}

export const { lumens } = withValueType(NativeArithmetic);
