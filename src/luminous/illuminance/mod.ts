import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as intensityWithValueType } from "../intensity/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";

/** A quantity of illuminance. */
export type Illuminance<NumberType = number> = Quantity<
  NumberType,
  dimension.Illuminance
>;

/** A unit of illuminance. */
type IlluminanceUnit<T> = Unit<T, dimension.Illuminance>;

/**
 * Creates illuminance units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with illuminance unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  lux: IlluminanceUnit<NumberType>;
} {
  const { candelas } = intensityWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);

  /** The lux, symbol `lx`, is the SI unit for illuminance. */
  const lux: Unit<NumberType, dimension.Illuminance> = candelas
    .per(meters.squared())
    .withSymbol("lx");

  return { lux };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The lux, symbol `lx`, is the SI unit for illuminance. */
export const lux = _units.lux;
