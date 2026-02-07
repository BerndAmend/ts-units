import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../../unit.ts";
import { withValueType as scalarWithValueType } from "../../scalar/mod.ts";

/** A quantity of solid angle. */
export type SolidAngle<NumberType = number> = Quantity<
  NumberType,
  dimension.SolidAngle
>;

/** A unit of solid angle. */
type SolidAngleUnit<T> = Unit<T, dimension.SolidAngle>;

/**
 * Creates solid angle units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with solid angle unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  steradians: SolidAngleUnit<NumberType>;
  squareDegrees: SolidAngleUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);
  const { scalar } = scalarWithValueType(arithmetic);

  /** The steradian, symbol `sr`, is the SI unit for solid angle. */
  const steradians = makeUnit("sr", dimension.SolidAngle);

  /** Square degrees. */
  const squareDegrees = steradians
    .times(scalar(Math.PI).per(180).cubed().valueOf())
    .withSymbol("deg²");

  return { steradians, squareDegrees };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The steradian, symbol `sr`, is the SI unit for solid angle. */
export const steradians = _units.steradians;

/** Square degrees. */
export const squareDegrees = _units.squareDegrees;
