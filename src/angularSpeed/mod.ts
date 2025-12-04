import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { type Geometric, NativeGeometric } from "../geometric.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as angleWithValueType } from "../angle/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of angular speed. */
export type AngularSpeed<NumberType = number> = Quantity<
  NumberType,
  dimension.AngularSpeed
>;

export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
  geometric: Geometric<NumberType>,
) {
  const { radians, degrees } = angleWithValueType(arithmetic, geometric);
  const { seconds } = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    static radiansPerSecond: Unit<NumberType, dimension.AngularSpeed> = radians
      .per(seconds)
      .withSymbol("rad/s");

    static degreesPerSecond: Unit<NumberType, dimension.AngularSpeed> = degrees
      .per(seconds)
      .withSymbol("°/s");
  }

  return WithValueType;
}

export const {
  radiansPerSecond,
  degreesPerSecond,
} = withValueType(NativeArithmetic, NativeGeometric);
