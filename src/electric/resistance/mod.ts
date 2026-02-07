import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of electrical resistance. */
export type Resistance<NumberType = number> = Quantity<
  NumberType,
  dimension.Resistance
>;

/** A unit of electrical resistance. */
type ResistanceUnit<T> = Unit<T, dimension.Resistance>;

/**
 * Creates electrical resistance units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with electrical resistance unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  ohms: ResistanceUnit<NumberType>;
} {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The ohm, symbol `Ω`, is the SI unit for electrical resistance. */
  const ohms: Unit<NumberType, dimension.Resistance> = kilograms
    .times(meters.squared())
    .per(seconds.cubed())
    .per(amperes.squared())
    .withSymbol("Ω");

  return { ohms };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The ohm, symbol `Ω`, is the SI unit for electrical resistance. */
export const ohms = _units.ohms;
