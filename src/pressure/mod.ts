import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import type { Quantity, Unit } from "../unit.ts";
import { withValueType as lengthWithValueType } from "../length/mod.ts";
import { withValueType as massWithValueType } from "../mass/mod.ts";
import { withValueType as timeWithValueType } from "../time/mod.ts";

/** A quantity of pressure. */
export type Pressure<NumberType = number> = Quantity<
  NumberType,
  dimension.Pressure
>;

/** A unit of pressure. */
type PressureUnit<T> = Unit<T, dimension.Pressure>;

/**
 * Creates pressure units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with pressure unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  pascals: PressureUnit<NumberType>;
  bar: PressureUnit<NumberType>;
  millibar: PressureUnit<NumberType>;
  psi: PressureUnit<NumberType>;
  atmospheres: PressureUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The pascal, symbol `Pa`, is the SI unit for pressure. */
  const pascals: Unit<NumberType, dimension.Pressure> = kilograms
    .per(meters)
    .per(seconds.squared())
    .withSymbol("Pa");

  /** One bar equals 100,000 pascals. */
  const bar = pascals.times(100000).withSymbol("bar");

  /** One millibar equals 100 pascals. */
  const millibar = pascals.times(100).withSymbol("mbar");

  /** One pound per square inch (psi) equals approximately 6894.76 pascals. */
  const psi = pascals.times(6894.757293168).withSymbol("psi");

  /** One standard atmosphere equals 101,325 pascals. */
  const atmospheres = pascals.times(101325).withSymbol("atm");

  return { pascals, bar, millibar, psi, atmospheres };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The pascal, symbol `Pa`, is the SI unit for pressure. */
export const pascals = _units.pascals;

/** One bar equals 100,000 pascals. */
export const bar = _units.bar;

/** One millibar equals 100 pascals. */
export const millibar = _units.millibar;

/** One pound per square inch (psi) equals approximately 6894.76 pascals. */
export const psi = _units.psi;

/** One standard atmosphere equals 101,325 pascals. */
export const atmospheres = _units.atmospheres;
