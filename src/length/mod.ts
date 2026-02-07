import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../unit.ts";

/** A quantity of length. */
export type Length<NumberType = number> = Quantity<
  NumberType,
  dimension.Length
>;

/** A unit of length. */
type LengthUnit<T> = Unit<T, dimension.Length>;

/**
 * Creates length units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with length unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  meters: LengthUnit<NumberType>;
  kilometers: LengthUnit<NumberType>;
  centimeters: LengthUnit<NumberType>;
  millimeters: LengthUnit<NumberType>;
  micrometers: LengthUnit<NumberType>;
  nanometers: LengthUnit<NumberType>;
  picometers: LengthUnit<NumberType>;
  femtometers: LengthUnit<NumberType>;
  fermi: LengthUnit<NumberType>;
  angstroms: LengthUnit<NumberType>;
  microns: LengthUnit<NumberType>;
  yards: LengthUnit<NumberType>;
  feet: LengthUnit<NumberType>;
  inches: LengthUnit<NumberType>;
  chains: LengthUnit<NumberType>;
  furlongs: LengthUnit<NumberType>;
  miles: LengthUnit<NumberType>;
  fathoms: LengthUnit<NumberType>;
  nauticalMiles: LengthUnit<NumberType>;
  astronomicalUnits: LengthUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /**
   * The meter, symbol `m`, is the SI base unit of length. All other units in
   * this module are defined as scaled values of the meter.
   */
  const meters = makeUnit("m", dimension.Length);
  const kilometers = meters.withSiPrefix("k");
  const centimeters = meters.withSiPrefix("c");
  const millimeters = meters.withSiPrefix("m");
  const micrometers = meters.withSiPrefix("μ");
  const nanometers = meters.withSiPrefix("n");
  const picometers = meters.withSiPrefix("p");
  const femtometers = meters.withSiPrefix("f");

  const fermi = femtometers;
  const angstroms = meters.times(1e-10).withSymbol("Å");
  const microns = micrometers;

  // Imperial units
  const yards = meters.times(0.9144).withSymbol("yd");
  const feet = yards.per(3).withSymbol("ft");
  const inches = feet.per(12).withSymbol("in");
  const chains = yards.times(22).withSymbol("ch");
  const furlongs = chains.times(10).withSymbol("fur");
  const miles = furlongs.times(8).withSymbol("mi");

  // Marine units
  const fathoms = yards.times(2).withSymbol("ftm");
  const nauticalMiles = meters.times(1852).withSymbol("M");

  // Astronomical Units
  const astronomicalUnits = meters.times(149597870700).withSymbol("au");

  return {
    meters,
    kilometers,
    centimeters,
    millimeters,
    micrometers,
    nanometers,
    picometers,
    femtometers,
    fermi,
    angstroms,
    microns,
    yards,
    feet,
    inches,
    chains,
    furlongs,
    miles,
    fathoms,
    nauticalMiles,
    astronomicalUnits,
  };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The meter, symbol `m`, is the SI base unit of length.
 */
export const meters = _units.meters;

/** One kilometer equals 1000 meters. */
export const kilometers = _units.kilometers;

/** One centimeter equals 0.01 meters. */
export const centimeters = _units.centimeters;

/** One millimeter equals 0.001 meters. */
export const millimeters = _units.millimeters;

/** One micrometer equals 0.000001 meters. */
export const micrometers = _units.micrometers;

/** One nanometer equals 0.000000001 meters. */
export const nanometers = _units.nanometers;

/** One picometer equals 1e-12 meters. */
export const picometers = _units.picometers;

/** One femtometer equals 1e-15 meters. */
export const femtometers = _units.femtometers;

/** Alias for femtometers. */
export const fermi = _units.fermi;

/** One angstrom equals 1e-10 meters. */
export const angstroms = _units.angstroms;

/** Alias for micrometers. */
export const microns = _units.microns;

/** One yard equals 0.9144 meters. */
export const yards = _units.yards;

/** One foot equals 1/3 yard. */
export const feet = _units.feet;

/** One inch equals 1/12 foot. */
export const inches = _units.inches;

/** One chain equals 22 yards. */
export const chains = _units.chains;

/** One furlong equals 10 chains. */
export const furlongs = _units.furlongs;

/** One mile equals 8 furlongs. */
export const miles = _units.miles;

/** One fathom equals 2 yards. */
export const fathoms = _units.fathoms;

/** One nautical mile equals 1852 meters. */
export const nauticalMiles = _units.nauticalMiles;

/** One astronomical unit equals 149597870700 meters. */
export const astronomicalUnits = _units.astronomicalUnits;
