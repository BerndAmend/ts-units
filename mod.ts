/**
 * Physical Units for TypeScript
 *
 * A type-safe library for modeling physical units.
 *
 * @module
 */

export * as dimensions from "./dimensions.ts";
export {
  Brand,
  type Branding,
  Cubed,
  type Dimensions,
  type Over,
  Reciprocal,
  Squared,
  Times,
} from "./dimensions.ts";
export * from "./exponent.ts";
export * from "./unit.ts";

import * as dim from "./dimensions.ts";
import {
  makeUnitFactory,
  type MathFunctions,
  NativeMath,
  parse as parseBase,
  type Quantity,
  type Unit,
} from "./unit.ts";

// ============================================================================
// Quantity Type Aliases
// ============================================================================

/** A quantity of length. */
export type Length<T = number> = Quantity<T, dim.Length>;
/** A quantity of mass. */
export type Mass<T = number> = Quantity<T, dim.Mass>;
/** A quantity of time. */
export type Time<T = number> = Quantity<T, dim.Time>;
/** A quantity of electric current. */
export type Current<T = number> = Quantity<T, dim.Current>;
/** A quantity of temperature. */
export type Temperature<T = number> = Quantity<T, dim.Temperature>;
/** A quantity of amount of substance. */
export type AmountOfSubstance<T = number> = Quantity<T, dim.AmountOfSubstance>;
/** A quantity of luminous intensity. */
export type LuminousIntensity<T = number> = Quantity<T, dim.LuminousIntensity>;
/** A dimensionless quantity. */
export type Scalar<T = number> = Quantity<T, dim.Scalar>;
/** A quantity of planar angle. */
export type Angle<T = number> = Quantity<T, dim.Angle>;
/** A quantity of solid angle. */
export type SolidAngle<T = number> = Quantity<T, dim.SolidAngle>;
/** A quantity of area. */
export type Area<T = number> = Quantity<T, dim.Area>;
/** A quantity of volume. */
export type Volume<T = number> = Quantity<T, dim.Volume>;
/** A quantity of speed. */
export type Speed<T = number> = Quantity<T, dim.Speed>;
/** A quantity of acceleration. */
export type Acceleration<T = number> = Quantity<T, dim.Acceleration>;
/** A quantity of angular speed. */
export type AngularSpeed<T = number> = Quantity<T, dim.AngularSpeed>;
/** A quantity of frequency. */
export type Frequency<T = number> = Quantity<T, dim.Frequency>;
/** A quantity of force. */
export type Force<T = number> = Quantity<T, dim.Force>;
/** A quantity of energy. */
export type Energy<T = number> = Quantity<T, dim.Energy>;
/** A quantity of power. */
export type Power<T = number> = Quantity<T, dim.Power>;
/** A quantity of pressure. */
export type Pressure<T = number> = Quantity<T, dim.Pressure>;
/** A quantity of electric charge. */
export type Charge<T = number> = Quantity<T, dim.Charge>;
/** A quantity of voltage. */
export type Voltage<T = number> = Quantity<T, dim.Voltage>;
/** A quantity of electric resistance. */
export type Resistance<T = number> = Quantity<T, dim.Resistance>;
/** A quantity of electrical conductance. */
export type Conductance<T = number> = Quantity<T, dim.Conductance>;
/** A quantity of capacitance. */
export type Capacitance<T = number> = Quantity<T, dim.Capacitance>;
/** A quantity of inductance. */
export type Inductance<T = number> = Quantity<T, dim.Inductance>;
/** A quantity of magnetic flux. */
export type MagneticFlux<T = number> = Quantity<T, dim.MagneticFlux>;
/** A quantity of magnetic induction. */
export type MagneticInduction<T = number> = Quantity<T, dim.MagneticInduction>;
/** A quantity of luminous flux. */
export type LuminousFlux<T = number> = Quantity<T, dim.LuminousFlux>;
/** A quantity of illuminance. */
export type Illuminance<T = number> = Quantity<T, dim.Illuminance>;
/** A quantity of radioactivity. */
export type Radioactivity<T = number> = Quantity<T, dim.Radioactivity>;
/** A quantity of absorbed dose. */
export type AbsorbedDose<T = number> = Quantity<T, dim.AbsorbedDose>;
/** A quantity of equivalent dose. */
export type EquivalentDose<T = number> = Quantity<T, dim.EquivalentDose>;

// ============================================================================
// Unit Types for withValueType Return Type
// ============================================================================

/** All units returned by withValueType. */
export interface AllUnits<T> {
  [key: string]: Unit<T, dim.Dimensions>;
  // Length
  meters: Unit<T, dim.Length>;
  kilometers: Unit<T, dim.Length>;
  centimeters: Unit<T, dim.Length>;
  millimeters: Unit<T, dim.Length>;
  micrometers: Unit<T, dim.Length>;
  nanometers: Unit<T, dim.Length>;
  picometers: Unit<T, dim.Length>;
  femtometers: Unit<T, dim.Length>;
  angstroms: Unit<T, dim.Length>;
  inches: Unit<T, dim.Length>;
  feet: Unit<T, dim.Length>;
  yards: Unit<T, dim.Length>;
  miles: Unit<T, dim.Length>;
  nauticalMiles: Unit<T, dim.Length>;
  fathoms: Unit<T, dim.Length>;
  chains: Unit<T, dim.Length>;
  furlongs: Unit<T, dim.Length>;
  astronomicalUnits: Unit<T, dim.Length>;
  microns: Unit<T, dim.Length>;
  fermi: Unit<T, dim.Length>;

  // Mass
  kilograms: Unit<T, dim.Mass>;
  grams: Unit<T, dim.Mass>;
  milligrams: Unit<T, dim.Mass>;
  micrograms: Unit<T, dim.Mass>;
  tonnes: Unit<T, dim.Mass>;
  pounds: Unit<T, dim.Mass>;
  ounces: Unit<T, dim.Mass>;

  // Time
  seconds: Unit<T, dim.Time>;
  milliseconds: Unit<T, dim.Time>;
  microseconds: Unit<T, dim.Time>;
  nanoseconds: Unit<T, dim.Time>;
  minutes: Unit<T, dim.Time>;
  hours: Unit<T, dim.Time>;

  // Electric Current
  amperes: Unit<T, dim.Current>;

  // Temperature
  kelvin: Unit<T, dim.Temperature>;
  celsius: Unit<T, dim.Temperature>;
  fahrenheit: Unit<T, dim.Temperature>;
  rankine: Unit<T, dim.Temperature>;

  // Amount of Substance
  mole: Unit<T, dim.AmountOfSubstance>;

  // Luminous Intensity
  candelas: Unit<T, dim.LuminousIntensity>;

  // Scalar
  scalar: Unit<T, dim.Scalar>;
  percent: Unit<T, dim.Scalar>;
  permille: Unit<T, dim.Scalar>;
  permyriad: Unit<T, dim.Scalar>;

  // Angle
  radians: Unit<T, dim.Angle>;
  degrees: Unit<T, dim.Angle>;
  gradians: Unit<T, dim.Angle>;
  turns: Unit<T, dim.Angle>;

  // Solid Angle
  steradians: Unit<T, dim.SolidAngle>;
  squareDegrees: Unit<T, dim.SolidAngle>;

  // Area
  squareMeters: Unit<T, dim.Area>;

  // Volume
  cubicMeters: Unit<T, dim.Volume>;
  liters: Unit<T, dim.Volume>;
  milliliters: Unit<T, dim.Volume>;
  gallons: Unit<T, dim.Volume>;
  cups: Unit<T, dim.Volume>;
  fluidOunces: Unit<T, dim.Volume>;

  // Speed
  metersPerSecond: Unit<T, dim.Speed>;
  kilometersPerHour: Unit<T, dim.Speed>;
  milesPerHour: Unit<T, dim.Speed>;
  knots: Unit<T, dim.Speed>;
  feetPerSecond: Unit<T, dim.Speed>;

  // Acceleration
  metersPerSecondSquared: Unit<T, dim.Acceleration>;

  // Angular Speed
  radiansPerSecond: Unit<T, dim.AngularSpeed>;
  degreesPerSecond: Unit<T, dim.AngularSpeed>;

  // Frequency
  hertz: Unit<T, dim.Frequency>;

  // Force
  newtons: Unit<T, dim.Force>;

  // Energy
  joules: Unit<T, dim.Energy>;
  kilojoules: Unit<T, dim.Energy>;
  calories: Unit<T, dim.Energy>;
  kilocalories: Unit<T, dim.Energy>;
  kilowattHours: Unit<T, dim.Energy>;
  electronvolts: Unit<T, dim.Energy>;

  // Power
  watts: Unit<T, dim.Power>;

  // Pressure
  pascals: Unit<T, dim.Pressure>;
  bar: Unit<T, dim.Pressure>;
  millibar: Unit<T, dim.Pressure>;
  psi: Unit<T, dim.Pressure>;
  atmospheres: Unit<T, dim.Pressure>;

  // Electric Charge
  coulombs: Unit<T, dim.Charge>;

  // Voltage
  volts: Unit<T, dim.Voltage>;

  // Resistance
  ohms: Unit<T, dim.Resistance>;

  // Conductance
  siemens: Unit<T, dim.Conductance>;

  // Capacitance
  farads: Unit<T, dim.Capacitance>;
  microfarads: Unit<T, dim.Capacitance>;
  nanofarads: Unit<T, dim.Capacitance>;
  picofarads: Unit<T, dim.Capacitance>;

  // Inductance
  henries: Unit<T, dim.Inductance>;

  // Magnetic Flux
  webers: Unit<T, dim.MagneticFlux>;

  // Magnetic Induction
  teslas: Unit<T, dim.MagneticInduction>;

  // Luminous Flux
  lumens: Unit<T, dim.LuminousFlux>;

  // Illuminance
  lux: Unit<T, dim.Illuminance>;

  // Radioactivity
  becquerels: Unit<T, dim.Radioactivity>;

  // Absorbed Dose
  grays: Unit<T, dim.AbsorbedDose>;

  // Equivalent Dose
  sieverts: Unit<T, dim.EquivalentDose>;
}

/** Any unit with number type. */
export type AnyUnit = Unit<number, dim.Dimensions>;

/** Trigonometric functions for angles. */
export interface AngleFunctions<T> {
  sin: (angle: Quantity<T, dim.Angle>) => T;
  cos: (angle: Quantity<T, dim.Angle>) => T;
  tan: (angle: Quantity<T, dim.Angle>) => T;
  asin: (value: T) => Quantity<T, dim.Angle>;
  acos: (value: T) => Quantity<T, dim.Angle>;
  atan: (value: T) => Quantity<T, dim.Angle>;
  atan2: (x: T, y: T) => Quantity<T, dim.Angle>;
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Creates all units with a custom arithmetic and geometric type.
 *
 * @param arithmetic The arithmetic implementation to use.
 * @param geometric The geometric implementation to use (optional, defaults to native).
 * @returns An object with all unit definitions and trigonometric functions.
 */
export function withValueType<T>(
  math: MathFunctions<T>,
): { units: AllUnits<T>; trig: AngleFunctions<T> } {
  const { makeUnit } = makeUnitFactory<T>(math);

  // ==========================================================================
  // SI Base Units
  // ==========================================================================

  // Length
  const meters = makeUnit("m", dim.Length);
  const kilometers = meters.withSiPrefix("k");
  const centimeters = meters.withSiPrefix("c");
  const millimeters = meters.withSiPrefix("m");
  const micrometers = meters.withSiPrefix("μ");
  const nanometers = meters.withSiPrefix("n");
  const picometers = meters.withSiPrefix("p");
  const femtometers = meters.withSiPrefix("f");
  const angstroms = meters.times(1e-10).withSymbol("Å");
  const inches = meters.times(0.0254).withSymbol("in");
  const feet = inches.times(12).withSymbol("ft");
  const yards = feet.times(3).withSymbol("yd");
  const miles = feet.times(5280).withSymbol("mi");
  const nauticalMiles = meters.times(1852).withSymbol("NM");
  const fathoms = feet.times(6).withSymbol("fathom");
  const chains = feet.times(66).withSymbol("chain");
  const furlongs = chains.times(10).withSymbol("furlong");
  const astronomicalUnits = meters.times(149597870700).withSymbol("AU");
  const microns = micrometers;
  const fermi = femtometers;

  // Mass
  const grams = makeUnit("g", dim.Mass);
  const kilograms = grams.withSiPrefix("k");
  const milligrams = grams.withSiPrefix("m");
  const micrograms = grams.withSiPrefix("μ");
  const tonnes = kilograms.times(1000).withSymbol("t");
  const pounds = grams.times(453.59237).withSymbol("lb");
  const ounces = pounds.per(16).withSymbol("oz");

  // Time
  const seconds = makeUnit("s", dim.Time);
  const milliseconds = seconds.withSiPrefix("m");
  const microseconds = seconds.withSiPrefix("μ");
  const nanoseconds = seconds.withSiPrefix("n");
  const minutes = seconds.times(60).withSymbol("min");
  const hours = minutes.times(60).withSymbol("h");

  // Electric Current
  const amperes = makeUnit("A", dim.Current);

  // Temperature
  const kelvin = makeUnit("K", dim.Temperature);
  const celsius = kelvin.withOffset(-273.15).withSymbol("°C");
  const fahrenheit = kelvin.times(5 / 9).withOffset(-459.67).withSymbol(
    "°F",
  );
  const rankine = kelvin.times(5 / 9).withSymbol("°R");

  // Amount of Substance
  const mole = makeUnit("mol", dim.AmountOfSubstance);

  // Luminous Intensity
  const candelas = makeUnit("cd", dim.LuminousIntensity);

  // ==========================================================================
  // Dimensionless Units
  // ==========================================================================

  // Scalar
  const scalar = makeUnit("", dim.Scalar);
  const percent = scalar.times(0.01).withSymbol("%");
  const permille = scalar.times(0.001).withSymbol("‰");
  const permyriad = scalar.times(0.0001).withSymbol("‱");

  // Angle
  const radians = makeUnit("rad", dim.Angle);
  const degrees = radians.times(Math.PI / 180).withSymbol("°");
  const gradians = radians.times(Math.PI / 200).withSymbol("gon");
  const turns = radians.times(2 * Math.PI).withSymbol("tr");

  // Solid Angle
  const steradians = makeUnit("sr", dim.SolidAngle);
  const squareDegrees = steradians.times((Math.PI / 180) ** 2).withSymbol(
    "deg²",
  );

  // ==========================================================================
  // Derived Units
  // ==========================================================================

  // Area
  const squareMeters = meters.squared().brand(dim.Area);

  // Volume
  const cubicMeters = meters.cubed().brand(dim.Volume);
  const liters = cubicMeters.times(0.001).withSymbol("L");
  const milliliters = liters.withSiPrefix("m");
  const gallons = liters.times(3.785411784).withSymbol("gal");
  const cups = milliliters.times(236.588).withSymbol("cup");
  const fluidOunces = milliliters.times(29.5735).withSymbol("fl oz");

  // Speed
  const metersPerSecond = meters.per(seconds).brand(dim.Speed);
  const kilometersPerHour = kilometers.per(hours).brand(dim.Speed);
  const milesPerHour = miles.per(hours).brand(dim.Speed).withSymbol("mph");
  const knots = nauticalMiles.per(hours).brand(dim.Speed).withSymbol("kn");
  const feetPerSecond = feet.per(seconds).brand(dim.Speed).withSymbol("fps");

  // Acceleration
  const metersPerSecondSquared = meters.per(seconds.squared()).brand(
    dim.Acceleration,
  );

  // Angular Speed
  const radiansPerSecond = radians.per(seconds).brand(dim.AngularSpeed);
  const degreesPerSecond = degrees.per(seconds).brand(dim.AngularSpeed);

  // Frequency
  const hertz = seconds.reciprocal().brand(dim.Frequency).withSymbol("Hz");

  // Force
  const newtons = kilograms
    .times(meters)
    .per(seconds.squared())
    .brand(dim.Force)
    .withSymbol("N");

  // Energy
  const joules = kilograms
    .times(meters.squared())
    .per(seconds.squared())
    .brand(dim.Energy)
    .withSymbol("J");
  const kilojoules = joules.withSiPrefix("k");
  const calories = joules.times(4.184).withSymbol("cal");
  const kilocalories = calories.withSiPrefix("k");
  const kilowattHours = joules.times(3.6e6).withSymbol("kWh");
  const electronvolts = joules.times(1.602176634e-19).withSymbol("eV");

  // Power
  const watts = joules.per(seconds).brand(dim.Power).withSymbol("W");

  // Pressure
  const pascals = kilograms
    .per(meters)
    .per(seconds.squared())
    .brand(dim.Pressure)
    .withSymbol("Pa");
  const bar = pascals.times(100000).withSymbol("bar");
  const millibar = bar.withSiPrefix("m");
  const psi = pascals.times(6894.757293168).withSymbol("psi");
  const atmospheres = pascals.times(101325).withSymbol("atm");

  // Electric Charge
  const coulombs = amperes.times(seconds).brand(dim.Charge).withSymbol("C");

  // Voltage
  const volts = watts.per(amperes).brand(dim.Voltage).withSymbol("V");

  // Resistance
  const ohms = volts.per(amperes).brand(dim.Resistance).withSymbol("Ω");

  // Conductance
  const siemens = ohms.reciprocal().brand(dim.Conductance).withSymbol("S");

  // Capacitance
  const farads = coulombs.per(volts).brand(dim.Capacitance).withSymbol("F");
  const microfarads = farads.withSiPrefix("μ");
  const nanofarads = farads.withSiPrefix("n");
  const picofarads = farads.withSiPrefix("p");

  // Inductance
  const henries = volts
    .times(seconds)
    .per(amperes)
    .brand(dim.Inductance)
    .withSymbol("H");

  // Magnetic Flux
  const webers = volts.times(seconds).brand(dim.MagneticFlux).withSymbol("Wb");

  // Magnetic Induction
  const teslas = webers.per(squareMeters).brand(dim.MagneticInduction)
    .withSymbol("T");

  // Luminous Flux
  const lumens = candelas.times(steradians).brand(dim.LuminousFlux).withSymbol(
    "lm",
  );

  // Illuminance
  const lux = lumens.per(squareMeters).brand(dim.Illuminance);

  // Radioactivity
  const becquerels = seconds.reciprocal().brand(dim.Radioactivity).withSymbol(
    "Bq",
  );

  // Absorbed Dose
  const grays = joules.per(kilograms).brand(dim.AbsorbedDose).withSymbol("Gy");

  // Equivalent Dose
  const sieverts = joules.per(kilograms).brand(dim.EquivalentDose).withSymbol(
    "Sv",
  );

  // ==========================================================================
  // Trigonometric Functions
  // ==========================================================================

  const sin = (angle: Quantity<T, dim.Angle>): T =>
    math.sin(angle.in(radians).amount);

  const cos = (angle: Quantity<T, dim.Angle>): T =>
    math.cos(angle.in(radians).amount);

  const tan = (angle: Quantity<T, dim.Angle>): T =>
    math.tan(angle.in(radians).amount);

  const asin = (value: T): Quantity<T, dim.Angle> => radians(math.asin(value));
  const acos = (value: T): Quantity<T, dim.Angle> => radians(math.acos(value));
  const atan = (value: T): Quantity<T, dim.Angle> => radians(math.atan(value));
  const atan2 = (
    x: T,
    y: T,
  ): Quantity<T, dim.Angle> => radians(math.atan2(x, y));

  const units: AllUnits<T> = {
    // Length
    meters,
    kilometers,
    centimeters,
    millimeters,
    micrometers,
    nanometers,
    picometers,
    femtometers,
    angstroms,
    inches,
    feet,
    yards,
    miles,
    nauticalMiles,
    fathoms,
    chains,
    furlongs,
    astronomicalUnits,
    microns,
    fermi,

    // Mass
    kilograms,
    grams,
    milligrams,
    micrograms,
    tonnes,
    pounds,
    ounces,

    // Time
    seconds,
    milliseconds,
    microseconds,
    nanoseconds,
    minutes,
    hours,

    // Electric Current
    amperes,

    // Temperature
    kelvin,
    celsius,
    fahrenheit,
    rankine,

    // Amount of Substance
    mole,

    // Luminous Intensity
    candelas,

    // Scalar
    scalar,
    percent,
    permille,
    permyriad,

    // Angle
    radians,
    degrees,
    gradians,
    turns,

    // Solid Angle
    steradians,
    squareDegrees,

    // Area
    squareMeters,

    // Volume
    cubicMeters,
    liters,
    milliliters,
    gallons,
    cups,
    fluidOunces,

    // Speed
    metersPerSecond,
    kilometersPerHour,
    milesPerHour,
    knots,
    feetPerSecond,

    // Acceleration
    metersPerSecondSquared,

    // Angular Speed
    radiansPerSecond,
    degreesPerSecond,

    // Frequency
    hertz,

    // Force
    newtons,

    // Energy
    joules,
    kilojoules,
    calories,
    kilocalories,
    kilowattHours,
    electronvolts,

    // Power
    watts,

    // Pressure
    pascals,
    bar,
    millibar,
    psi,
    atmospheres,

    // Electric Charge
    coulombs,

    // Voltage
    volts,

    // Resistance
    ohms,

    // Conductance
    siemens,

    // Capacitance
    farads,
    microfarads,
    nanofarads,
    picofarads,

    // Inductance
    henries,

    // Magnetic Flux
    webers,

    // Magnetic Induction
    teslas,

    // Luminous Flux
    lumens,

    // Illuminance
    lux,

    // Radioactivity
    becquerels,

    // Absorbed Dose
    grays,

    // Equivalent Dose
    sieverts,
  };

  const trig: AngleFunctions<T> = {
    sin,
    cos,
    tan,
    asin,
    acos,
    atan,
    atan2,
  };

  return { units, trig };
}

// ============================================================================
// Default Units (using native number type)
// ============================================================================

const _result: { units: AllUnits<number>; trig: AngleFunctions<number> } =
  withValueType(NativeMath);
export const allUnits: AllUnits<number> = _result.units;
const _trig: AngleFunctions<number> = _result.trig;

// Length
export const meters = allUnits.meters;
export const kilometers = allUnits.kilometers;
export const centimeters = allUnits.centimeters;
export const millimeters = allUnits.millimeters;
export const micrometers = allUnits.micrometers;
export const nanometers = allUnits.nanometers;
export const picometers = allUnits.picometers;
export const femtometers = allUnits.femtometers;
export const angstroms = allUnits.angstroms;
export const inches = allUnits.inches;
export const feet = allUnits.feet;
export const yards = allUnits.yards;
export const miles = allUnits.miles;
export const nauticalMiles = allUnits.nauticalMiles;
export const fathoms = allUnits.fathoms;
export const chains = allUnits.chains;
export const furlongs = allUnits.furlongs;
export const astronomicalUnits = allUnits.astronomicalUnits;
export const microns = allUnits.microns;
export const fermi = allUnits.fermi;

// Mass
export const kilograms = allUnits.kilograms;
export const grams = allUnits.grams;
export const milligrams = allUnits.milligrams;
export const micrograms = allUnits.micrograms;
export const tonnes = allUnits.tonnes;
export const pounds = allUnits.pounds;
export const ounces = allUnits.ounces;

// Time
export const seconds = allUnits.seconds;
export const milliseconds = allUnits.milliseconds;
export const microseconds = allUnits.microseconds;
export const nanoseconds = allUnits.nanoseconds;
export const minutes = allUnits.minutes;
export const hours = allUnits.hours;

// Electric Current
export const amperes = allUnits.amperes;

// Temperature
export const kelvin = allUnits.kelvin;
export const celsius = allUnits.celsius;
export const fahrenheit = allUnits.fahrenheit;
export const rankine = allUnits.rankine;

// Amount of Substance
export const mole = allUnits.mole;

// Luminous Intensity
export const candelas = allUnits.candelas;

// Scalar
export const scalar = allUnits.scalar;
export const percent = allUnits.percent;
export const permille = allUnits.permille;
export const permyriad = allUnits.permyriad;

// Angle
export const radians = allUnits.radians;
export const degrees = allUnits.degrees;
export const gradians = allUnits.gradians;
export const turns = allUnits.turns;

// Solid Angle
export const steradians = allUnits.steradians;
export const squareDegrees = allUnits.squareDegrees;

// Area
export const squareMeters = allUnits.squareMeters;

// Volume
export const cubicMeters = allUnits.cubicMeters;
export const liters = allUnits.liters;
export const milliliters = allUnits.milliliters;
export const gallons = allUnits.gallons;
export const cups = allUnits.cups;
export const fluidOunces = allUnits.fluidOunces;

// Speed
export const metersPerSecond = allUnits.metersPerSecond;
export const kilometersPerHour = allUnits.kilometersPerHour;
export const milesPerHour = allUnits.milesPerHour;
export const knots = allUnits.knots;
export const feetPerSecond = allUnits.feetPerSecond;

// Acceleration
export const metersPerSecondSquared = allUnits.metersPerSecondSquared;

// Angular Speed
export const radiansPerSecond = allUnits.radiansPerSecond;
export const degreesPerSecond = allUnits.degreesPerSecond;

// Frequency
export const hertz = allUnits.hertz;

// Force
export const newtons = allUnits.newtons;

// Energy
export const joules = allUnits.joules;
export const kilojoules = allUnits.kilojoules;
export const calories = allUnits.calories;
export const kilocalories = allUnits.kilocalories;
export const kilowattHours = allUnits.kilowattHours;
export const electronvolts = allUnits.electronvolts;

// Power
export const watts = allUnits.watts;

// Pressure
export const pascals = allUnits.pascals;
export const bar = allUnits.bar;
export const millibar = allUnits.millibar;
export const psi = allUnits.psi;
export const atmospheres = allUnits.atmospheres;

// Electric Charge
export const coulombs = allUnits.coulombs;

// Voltage
export const volts = allUnits.volts;

// Resistance
export const ohms = allUnits.ohms;

// Conductance
export const siemens = allUnits.siemens;

// Capacitance
export const farads = allUnits.farads;
export const microfarads = allUnits.microfarads;
export const nanofarads = allUnits.nanofarads;
export const picofarads = allUnits.picofarads;

// Inductance
export const henries = allUnits.henries;

// Magnetic Flux
export const webers = allUnits.webers;

// Magnetic Induction
export const teslas = allUnits.teslas;

// Luminous Flux
export const lumens = allUnits.lumens;

// Illuminance
export const lux = allUnits.lux;

// Radioactivity
export const becquerels = allUnits.becquerels;

// Absorbed Dose
export const grays = allUnits.grays;

// Equivalent Dose
export const sieverts = allUnits.sieverts;

// Trigonometric functions
// Trigonometric functions
/** Calculate the sine of an angle. */
export const sin: (angle: Angle) => number = _trig.sin;
/** Calculate the cosine of an angle. */
export const cos: (angle: Angle) => number = _trig.cos;
/** Calculate the tangent of an angle. */
export const tan: (angle: Angle) => number = _trig.tan;
/** Calculate the arcsine of a number. */
export const asin: (value: number) => Angle = _trig.asin;
/** Calculate the arccosine of a number. */
export const acos: (value: number) => Angle = _trig.acos;
/** Calculate the arctangent of a number. */
export const atan: (value: number) => Angle = _trig.atan;
/** Calculate the arctangent of the quotient of its arguments. */
export const atan2: (x: number, y: number) => Angle = _trig.atan2;

/**
 * Parses a string into a quantity.
 * @param input The string to parse.
 * @param units A list or object of allowed units.
 * @returns The parsed quantity.
 */
export function parse(
  input: string,
  units?:
    | Unit<number, dim.Dimensions>[]
    | Record<string, Unit<number, dim.Dimensions>>
    | AllUnits<number>,
): Quantity<number, dim.Dimensions> {
  const unitsArg = units || allUnits;
  return parseBase(input, unitsArg);
}
