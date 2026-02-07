import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../unit.ts";

/** A quantity of thermodynamic temperature. */
export type Temperature<NumberType = number> = Quantity<
  NumberType,
  dimension.Temperature
>;

/** A unit of temperature. */
type TemperatureUnit<T> = Unit<T, dimension.Temperature>;

/**
 * Creates temperature units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with temperature unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  kelvin: TemperatureUnit<NumberType>;
  celsius: TemperatureUnit<NumberType>;
  fahrenheit: TemperatureUnit<NumberType>;
  rankine: TemperatureUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /**
   * The kelvin, symbol `K`, is the SI unit of thermodynamic temperature. All
   * other units in this module are defined as scaled values of the kelvin.
   */
  const kelvin = makeUnit("K", dimension.Temperature);

  /** Degrees Celsius, offset from kelvin by -273.15. */
  const celsius = kelvin.withOffset(-273.15).withSymbol("°C");

  /** Degrees Fahrenheit, uses 5/9 scale and -459.67 offset. */
  const fahrenheit = kelvin
    .times(5)
    .per(9)
    .withOffset(-459.67)
    .withSymbol("°F");

  /** Degrees Rankine, uses 1/1.8 scale. */
  const rankine = kelvin.per(1.8).withSymbol("°R");

  return { kelvin, celsius, fahrenheit, rankine };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The kelvin, symbol `K`, is the SI unit of thermodynamic temperature.
 */
export const kelvin = _units.kelvin;

/** Degrees Celsius, offset from kelvin by -273.15. */
export const celsius = _units.celsius;

/** Degrees Fahrenheit, uses 5/9 scale and -459.67 offset. */
export const fahrenheit = _units.fahrenheit;

/** Degrees Rankine, uses 1/1.8 scale. */
export const rankine = _units.rankine;
