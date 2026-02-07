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
  kilojoules: EnergyUnit<NumberType>;
  calories: EnergyUnit<NumberType>;
  kilocalories: EnergyUnit<NumberType>;
  kilowattHours: EnergyUnit<NumberType>;
  electronvolts: EnergyUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);
  const { kilograms } = massWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The joule, symbol `J`, is the SI unit for energy. */
  const joules: Unit<NumberType, dimension.Energy> = kilograms
    .times(meters.squared())
    .per(seconds.squared())
    .withSymbol("J");

  /** One kilojoule equals 1000 joules. */
  const kilojoules = joules.times(1000).withSymbol("kJ");

  /** One calorie (small calorie) equals 4.184 joules. */
  const calories = joules.times(4.184).withSymbol("cal");

  /** One kilocalorie (Calorie, food calorie) equals 1000 calories. */
  const kilocalories = calories.times(1000).withSymbol("kcal");

  /** One kilowatt-hour equals 3.6 megajoules. */
  const kilowattHours = joules.times(3.6e6).withSymbol("kWh");

  /** One electronvolt equals 1.602176634e-19 joules. */
  const electronvolts = joules.times(1.602176634e-19).withSymbol("eV");

  return {
    joules,
    kilojoules,
    calories,
    kilocalories,
    kilowattHours,
    electronvolts,
  };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The joule, symbol `J`, is the SI unit for energy. */
export const joules = _units.joules;

/** One kilojoule equals 1000 joules. */
export const kilojoules = _units.kilojoules;

/** One calorie (small calorie) equals 4.184 joules. */
export const calories = _units.calories;

/** One kilocalorie (Calorie, food calorie) equals 1000 calories. */
export const kilocalories = _units.kilocalories;

/** One kilowatt-hour equals 3.6 megajoules. */
export const kilowattHours = _units.kilowattHours;

/** One electronvolt equals 1.602176634e-19 joules. */
export const electronvolts = _units.electronvolts;
