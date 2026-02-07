import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as currentWithValueType } from "../current/mod.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as massWithValueType } from "../../mass/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of electrical capacitance. */
export type Capacitance<NumberType = number> = Quantity<
  NumberType,
  dimension.Capacitance
>;

/** A unit of electrical capacitance. */
type CapacitanceUnit<T> = Unit<T, dimension.Capacitance>;

/**
 * Creates electrical capacitance units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with electrical capacitance unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  farads: CapacitanceUnit<NumberType>;
  microfarads: CapacitanceUnit<NumberType>;
  nanofarads: CapacitanceUnit<NumberType>;
  picofarads: CapacitanceUnit<NumberType>;
} {
  const { amperes } = currentWithValueType(arithmetic);
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The farad, symbol `F`, is the SI unit for electrical capacitance. */
  const farads: Unit<NumberType, dimension.Capacitance> = seconds
    .squared()
    .squared()
    .times(amperes.squared())
    .per(kilograms)
    .per(meters.squared())
    .withSymbol("F");

  /** One microfarad equals 1e-6 farads. */
  const microfarads = farads.withSiPrefix("μ");

  /** One nanofarad equals 1e-9 farads. */
  const nanofarads = farads.withSiPrefix("n");

  /** One picofarad equals 1e-12 farads. */
  const picofarads = farads.withSiPrefix("p");

  return { farads, microfarads, nanofarads, picofarads };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The farad, symbol `F`, is the SI unit for electrical capacitance. */
export const farads = _units.farads;

/** One microfarad equals 1e-6 farads. */
export const microfarads = _units.microfarads;

/** One nanofarad equals 1e-9 farads. */
export const nanofarads = _units.nanofarads;

/** One picofarad equals 1e-12 farads. */
export const picofarads = _units.picofarads;
