import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as massWithValueType } from "../mass/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of power. */
export type Power<NumberType = number> = Quantity<NumberType, dimension.Power>;

/** A unit of power. */
type PowerUnit<T> = Unit<T, dimension.Power>;

/**
 * Creates power units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with power unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  watts: PowerUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The watt, symbol `W`, is the SI unit for power. */
  const watts: Unit<NumberType, dimension.Power> = kilograms
    .times(meters.squared())
    .per(seconds.cubed())
    .withSymbol("W");

  return { watts };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The watt, symbol `W`, is the SI unit for power. */
export const watts = _units.watts;
