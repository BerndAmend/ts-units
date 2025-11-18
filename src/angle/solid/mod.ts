import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import { makeUnitFactory, type Quantity } from "../../unit.ts";
import { withValueType as scalarWithValueType } from "../../scalar/mod.ts";

export type SolidAngle<NumberType = number> = Quantity<
  NumberType,
  dimension.SolidAngle
>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { makeUnit } = makeUnitFactory(arithmetic);
  const { scalar } = scalarWithValueType(arithmetic);

  return class WithValueType {
    private constructor() {}

    static steradians = makeUnit("sr", dimension.SolidAngle);
    static squareDegrees = WithValueType.steradians
      .times(scalar(Math.PI).per(180).cubed().valueOf())
      .withSymbol("deg²");
  };
}
export const { steradians, squareDegrees } = withValueType(NativeArithmetic);
