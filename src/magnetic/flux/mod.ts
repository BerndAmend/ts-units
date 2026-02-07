import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../../electric/current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of magnetic flux. */
export type Flux<NumberType = number> = Quantity<NumberType, dimension.Flux>;

/** A unit of magnetic flux. */
type MagneticFluxUnit<T> = Unit<T, dimension.Flux>;

/**
 * Creates magnetic flux units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with magnetic flux unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  webers: MagneticFluxUnit<NumberType>;
} {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The weber, symbol `Wb`, is the SI unit for magnetic flux. */
  const webers: Unit<NumberType, dimension.Flux> = kilograms
    .times(meters.squared())
    .per(seconds.squared())
    .per(amperes)
    .withSymbol("Wb");

  return { webers };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The weber, symbol `Wb`, is the SI unit for magnetic flux. */
export const webers = _units.webers;
