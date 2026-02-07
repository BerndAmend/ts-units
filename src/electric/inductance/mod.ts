import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of electrical inductance. */
export type Inductance<NumberType = number> = Quantity<
  NumberType,
  dimension.Inductance
>;

/** A unit of electrical inductance. */
type InductanceUnit<T> = Unit<T, dimension.Inductance>;

/**
 * Creates electrical inductance units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with electrical inductance unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  henries: InductanceUnit<NumberType>;
} {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The henry, symbol `H`, is the SI unit for electrical inductance. */
  const henries: Unit<NumberType, dimension.Inductance> = kilograms
    .times(meters.squared())
    .per(seconds.squared())
    .per(amperes.squared())
    .withSymbol("H");

  return { henries };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The henry, symbol `H`, is the SI unit for electrical inductance. */
export const henries = _units.henries;
