import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as massWithValueType } from "../mass/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of force. */
export type Force<NumberType = number> = Quantity<NumberType, dimension.Force>;

/** A unit of force. */
type ForceUnit<T> = Unit<T, dimension.Force>;

/**
 * Creates force units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with force unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  newtons: ForceUnit<NumberType>;
} {
  const { kilograms } = massWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The newton, symbol `N`, is the SI unit for force. */
  const newtons: Unit<NumberType, dimension.Force> = kilograms
    .times(meters)
    .per(seconds.squared())
    .withSymbol("N");

  return { newtons };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The newton, symbol `N`, is the SI unit for force. */
export const newtons = _units.newtons;
