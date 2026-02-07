import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of electrical conductance. */
export type Conductance<NumberType = number> = Quantity<
  NumberType,
  dimension.Conductance
>;

/** A unit of electrical conductance. */
type ConductanceUnit<T> = Unit<T, dimension.Conductance>;

/**
 * Creates electrical conductance units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with electrical conductance unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  siemens: ConductanceUnit<NumberType>;
} {
  const { amperes } = currentWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The siemens, symbol `S`, is the SI unit for electrical conductance. */
  const siemens: Unit<NumberType, dimension.Conductance> = seconds
    .cubed()
    .times(amperes.squared())
    .per(kilograms)
    .per(meters.squared())
    .withSymbol("S");

  return { siemens };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The siemens, symbol `S`, is the SI unit for electrical conductance. */
export const siemens = _units.siemens;
