import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as massWithValueType } from "../mass/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of energy. */
export type Energy<NumberType = number> = Quantity<
  NumberType,
  dimension.Energy
>;

/** A unit of energy. */
type EnergyUnit<T> = Unit<T, dimension.Energy>;

/**
 * Creates energy units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with energy unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  joules: EnergyUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The joule, symbol `J`, is the SI unit for energy. */
  const joules: Unit<NumberType, dimension.Energy> = kilograms
    .times(meters.squared())
    .per(seconds.squared())
    .withSymbol("J");

  return { joules };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The joule, symbol `J`, is the SI unit for energy. */
export const joules = _units.joules;
