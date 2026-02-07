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

/** A unit of electric charge. */
type ChargeUnit<T> = Unit<T, dimension.Charge>;

/**
 * Creates electric charge units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with electric charge unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  coulombs: ChargeUnit<NumberType>;
} {
  const { amperes } = currentWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The coulomb, symbol `C`, is the SI unit for electric charge. */
  const coulombs: Unit<NumberType, dimension.Charge> = amperes
    .times(seconds)
    .withSymbol("C");

  return { coulombs };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The coulomb, symbol `C`, is the SI unit for electric charge. */
export const coulombs = _units.coulombs;
