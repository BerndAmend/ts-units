import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of frequency. */
export type Frequency<NumberType = number> = Quantity<
  NumberType,
  dimension.Frequency
>;

/** A unit of frequency. */
type FrequencyUnit<T> = Unit<T, dimension.Frequency>;

/**
 * Creates frequency units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with frequency unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  hertz: FrequencyUnit<NumberType>;
} {
  const { seconds } = timeWithValueType(arithmetic);

  /** The hertz, symbol `Hz`, is the SI unit for frequency. */
  const hertz: Unit<NumberType, dimension.Frequency> = seconds
    .reciprocal()
    .withSymbol("Hz");

  return { hertz };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The hertz, symbol `Hz`, is the SI unit for frequency. */
export const hertz = _units.hertz;
