import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../../electric/current/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of magnetic induction. */
export type MagneticInduction<NumberType = number> = Quantity<
  NumberType,
  dimension.MagneticInduction
>;

/** A unit of magnetic induction. */
type MagneticInductionUnit<T> = Unit<T, dimension.MagneticInduction>;

/**
 * Creates magnetic induction units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with magnetic induction unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  teslas: MagneticInductionUnit<NumberType>;
} {
  const { amperes } = currentWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The tesla, symbol `T`, is the SI unit for magnetic induction. */
  const teslas: Unit<NumberType, dimension.MagneticInduction> = kilograms
    .per(seconds.squared())
    .per(amperes)
    .withSymbol("T");

  return { teslas };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The tesla, symbol `T`, is the SI unit for magnetic induction. */
export const teslas = _units.teslas;
