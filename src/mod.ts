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
  s: Unit<T, dim.Time>;
  msec: Unit<T, dim.Time>;
  usec: Unit<T, dim.Time>;
  nsec: Unit<T, dim.Time>;

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
): AllUnits<T> & AngleFunctions<T> {
  const { makeUnit } = makeUnitFactory<T>(math);

  // ==========================================================================
  // SI Base Units
  // ==========================================================================

  // Length
  const meters = makeUnit("m", dim.Length);
  const kilometers = meters.times(1000).withSymbol("km");
  const centimeters = meters.times(0.01).withSymbol("cm");
  const millimeters = meters.times(0.001).withSymbol("mm");
  const micrometers = meters.times(1e-6).withSymbol("μm");
  const nanometers = meters.times(1e-9).withSymbol("nm");
  const picometers = meters.times(1e-12).withSymbol("pm");
  const femtometers = meters.times(1e-15).withSymbol("fm");
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
  const kilograms = makeUnit("kg", dim.Mass);
  const grams = kilograms.times(0.001).withSymbol("g");
  const milligrams = kilograms.times(1e-6).withSymbol("mg");
  const micrograms = kilograms.times(1e-9).withSymbol("μg");
  const tonnes = kilograms.times(1000).withSymbol("t");
  const pounds = kilograms.times(0.45359237).withSymbol("lb");
  const ounces = pounds.per(16).withSymbol("oz");

  // Time
  const seconds = makeUnit("s", dim.Time);
  const milliseconds = seconds.times(0.001).withSymbol("ms");
  const microseconds = seconds.times(1e-6).withSymbol("μs");
  const nanoseconds = seconds.times(1e-9).withSymbol("ns");
  const minutes = seconds.times(60).withSymbol("min");
  const hours = minutes.times(60).withSymbol("h");
  const s = seconds;
  const msec = milliseconds;
  const usec = microseconds;
  const nsec = nanoseconds;

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
  const squareMeters = meters.squared().withSymbol("m²") as Unit<T, dim.Area>;

  // Volume
  const cubicMeters = meters.cubed().withSymbol("m³") as Unit<T, dim.Volume>;
  const liters = cubicMeters.times(0.001).withSymbol("L");
  const milliliters = liters.times(0.001).withSymbol("mL");
  const gallons = liters.times(3.785411784).withSymbol("gal");
  const cups = milliliters.times(236.588).withSymbol("cup");
  const fluidOunces = milliliters.times(29.5735).withSymbol("fl oz");

  // Speed
  const metersPerSecond = meters.per(seconds).withSymbol("m/s") as Unit<
    T,
    dim.Speed
  >;
  const kilometersPerHour = kilometers.per(hours).withSymbol("km/h") as Unit<
    T,
    dim.Speed
  >;
  const milesPerHour = miles.per(hours).withSymbol("mph") as Unit<T, dim.Speed>;
  const knots = nauticalMiles.per(hours).withSymbol("kn") as Unit<T, dim.Speed>;
  const feetPerSecond = feet.per(seconds).withSymbol("fps") as Unit<
    T,
    dim.Speed
  >;

  // Acceleration
  const metersPerSecondSquared = meters
    .per(seconds.squared())
    .withSymbol("m/s²") as Unit<T, dim.Acceleration>;

  // Angular Speed
  const radiansPerSecond = radians.per(seconds).withSymbol("rad/s") as Unit<
    T,
    dim.AngularSpeed
  >;
  const degreesPerSecond = degrees.per(seconds).withSymbol("°/s") as Unit<
    T,
    dim.AngularSpeed
  >;

  // Frequency
  const hertz = seconds.reciprocal().withSymbol("Hz") as Unit<T, dim.Frequency>;

  // Force
  const newtons = kilograms
    .times(meters)
    .per(seconds.squared())
    .withSymbol("N") as Unit<T, dim.Force>;

  // Energy
  const joules = kilograms
    .times(meters.squared())
    .per(seconds.squared())
    .withSymbol("J") as Unit<T, dim.Energy>;
  const kilojoules = joules.times(1000).withSymbol("kJ");
  const calories = joules.times(4.184).withSymbol("cal");
  const kilocalories = calories.times(1000).withSymbol("kcal");
  const kilowattHours = joules.times(3.6e6).withSymbol("kWh");
  const electronvolts = joules.times(1.602176634e-19).withSymbol("eV");

  // Power
  const watts = joules.per(seconds).withSymbol("W") as Unit<T, dim.Power>;

  // Pressure
  const pascals = kilograms
    .per(meters)
    .per(seconds.squared())
    .withSymbol("Pa") as Unit<T, dim.Pressure>;
  const bar = pascals.times(100000).withSymbol("bar");
  const millibar = pascals.times(100).withSymbol("mbar");
  const psi = pascals.times(6894.757293168).withSymbol("psi");
  const atmospheres = pascals.times(101325).withSymbol("atm");

  // Electric Charge
  const coulombs = amperes.times(seconds).withSymbol("C") as Unit<
    T,
    dim.Charge
  >;

  // Voltage
  const volts = watts.per(amperes).withSymbol("V") as Unit<T, dim.Voltage>;

  // Resistance
  const ohms = volts.per(amperes).withSymbol("Ω") as Unit<T, dim.Resistance>;

  // Conductance
  const siemens = ohms.reciprocal().withSymbol("S") as Unit<T, dim.Conductance>;

  // Capacitance
  const farads = coulombs.per(volts).withSymbol("F") as Unit<
    T,
    dim.Capacitance
  >;
  const microfarads = farads.times(1e-6).withSymbol("μF");
  const nanofarads = farads.times(1e-9).withSymbol("nF");
  const picofarads = farads.times(1e-12).withSymbol("pF");

  // Inductance
  const henries = volts
    .times(seconds)
    .per(amperes)
    .withSymbol("H") as Unit<T, dim.Inductance>;

  // Magnetic Flux
  const webers = volts.times(seconds).withSymbol("Wb") as Unit<
    T,
    dim.MagneticFlux
  >;

  // Magnetic Induction
  const teslas = webers.per(squareMeters).withSymbol("T") as Unit<
    T,
    dim.MagneticInduction
  >;

  // Luminous Flux
  const lumens = candelas.times(steradians).withSymbol("lm") as Unit<
    T,
    dim.LuminousFlux
  >;

  // Illuminance
  const lux = lumens.per(squareMeters).withSymbol("lx") as Unit<
    T,
    dim.Illuminance
  >;

  // Radioactivity
  const becquerels = seconds.reciprocal().withSymbol("Bq") as Unit<
    T,
    dim.Radioactivity
  >;

  // Absorbed Dose
  const grays = joules.per(kilograms).withSymbol("Gy") as Unit<
    T,
    dim.AbsorbedDose
  >;

  // Equivalent Dose
  const sieverts = joules.per(kilograms).withSymbol("Sv") as Unit<
    T,
    dim.EquivalentDose
  >;

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

  return {
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
    s,
    msec,
    usec,
    nsec,

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

    // Trigonometric functions
    sin,
    cos,
    tan,
    asin,
    acos,
    atan,
    atan2,
  };
}

// ============================================================================
// Default Units (using native number type)
// ============================================================================

const _units: AllUnits<number> & AngleFunctions<number> = withValueType(
  NativeMath,
);

// Length
export const meters = _units.meters;
export const kilometers = _units.kilometers;
export const centimeters = _units.centimeters;
export const millimeters = _units.millimeters;
export const micrometers = _units.micrometers;
export const nanometers = _units.nanometers;
export const picometers = _units.picometers;
export const femtometers = _units.femtometers;
export const angstroms = _units.angstroms;
export const inches = _units.inches;
export const feet = _units.feet;
export const yards = _units.yards;
export const miles = _units.miles;
export const nauticalMiles = _units.nauticalMiles;
export const fathoms = _units.fathoms;
export const chains = _units.chains;
export const furlongs = _units.furlongs;
export const astronomicalUnits = _units.astronomicalUnits;
export const microns = _units.microns;
export const fermi = _units.fermi;

// Mass
export const kilograms = _units.kilograms;
export const grams = _units.grams;
export const milligrams = _units.milligrams;
export const micrograms = _units.micrograms;
export const tonnes = _units.tonnes;
export const pounds = _units.pounds;
export const ounces = _units.ounces;

// Time
export const seconds = _units.seconds;
export const milliseconds = _units.milliseconds;
export const microseconds = _units.microseconds;
export const nanoseconds = _units.nanoseconds;
export const minutes = _units.minutes;
export const hours = _units.hours;
export const s = _units.s;
export const msec = _units.msec;
export const usec = _units.usec;
export const nsec = _units.nsec;

// Electric Current
export const amperes = _units.amperes;

// Temperature
export const kelvin = _units.kelvin;
export const celsius = _units.celsius;
export const fahrenheit = _units.fahrenheit;
export const rankine = _units.rankine;

// Amount of Substance
export const mole = _units.mole;

// Luminous Intensity
export const candelas = _units.candelas;

// Scalar
export const scalar = _units.scalar;
export const percent = _units.percent;
export const permille = _units.permille;
export const permyriad = _units.permyriad;

// Angle
export const radians = _units.radians;
export const degrees = _units.degrees;
export const gradians = _units.gradians;
export const turns = _units.turns;

// Solid Angle
export const steradians = _units.steradians;
export const squareDegrees = _units.squareDegrees;

// Area
export const squareMeters = _units.squareMeters;

// Volume
export const cubicMeters = _units.cubicMeters;
export const liters = _units.liters;
export const milliliters = _units.milliliters;
export const gallons = _units.gallons;
export const cups = _units.cups;
export const fluidOunces = _units.fluidOunces;

// Speed
export const metersPerSecond = _units.metersPerSecond;
export const kilometersPerHour = _units.kilometersPerHour;
export const milesPerHour = _units.milesPerHour;
export const knots = _units.knots;
export const feetPerSecond = _units.feetPerSecond;

// Acceleration
export const metersPerSecondSquared = _units.metersPerSecondSquared;

// Angular Speed
export const radiansPerSecond = _units.radiansPerSecond;
export const degreesPerSecond = _units.degreesPerSecond;

// Frequency
export const hertz = _units.hertz;

// Force
export const newtons = _units.newtons;

// Energy
export const joules = _units.joules;
export const kilojoules = _units.kilojoules;
export const calories = _units.calories;
export const kilocalories = _units.kilocalories;
export const kilowattHours = _units.kilowattHours;
export const electronvolts = _units.electronvolts;

// Power
export const watts = _units.watts;

// Pressure
export const pascals = _units.pascals;
export const bar = _units.bar;
export const millibar = _units.millibar;
export const psi = _units.psi;
export const atmospheres = _units.atmospheres;

// Electric Charge
export const coulombs = _units.coulombs;

// Voltage
export const volts = _units.volts;

// Resistance
export const ohms = _units.ohms;

// Conductance
export const siemens = _units.siemens;

// Capacitance
export const farads = _units.farads;
export const microfarads = _units.microfarads;
export const nanofarads = _units.nanofarads;
export const picofarads = _units.picofarads;

// Inductance
export const henries = _units.henries;

// Magnetic Flux
export const webers = _units.webers;

// Magnetic Induction
export const teslas = _units.teslas;

// Luminous Flux
export const lumens = _units.lumens;

// Illuminance
export const lux = _units.lux;

// Radioactivity
export const becquerels = _units.becquerels;

// Absorbed Dose
export const grays = _units.grays;

// Equivalent Dose
export const sieverts = _units.sieverts;

// Trigonometric functions
export const sin = _units.sin;
export const cos = _units.cos;
export const tan = _units.tan;
export const asin = _units.asin;
export const acos = _units.acos;
export const atan = _units.atan;
export const atan2 = _units.atan2;

export const allUnits: AnyUnit[] = [
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
  kilograms,
  grams,
  milligrams,
  micrograms,
  tonnes,
  pounds,
  ounces,
  seconds,
  milliseconds,
  microseconds,
  nanoseconds,
  minutes,
  hours,
  amperes,
  kelvin,
  celsius,
  fahrenheit,
  rankine,
  mole,
  candelas,
  scalar,
  percent,
  permille,
  permyriad,
  radians,
  degrees,
  gradians,
  turns,
  steradians,
  squareDegrees,
  squareMeters,
  cubicMeters,
  liters,
  milliliters,
  gallons,
  cups,
  fluidOunces,
  metersPerSecond,
  kilometersPerHour,
  milesPerHour,
  knots,
  feetPerSecond,
  metersPerSecondSquared,
  radiansPerSecond,
  degreesPerSecond,
  hertz,
  newtons,
  joules,
  kilojoules,
  calories,
  kilocalories,
  kilowattHours,
  electronvolts,
  watts,
  pascals,
  bar,
  millibar,
  psi,
  atmospheres,
  coulombs,
  volts,
  ohms,
  siemens,
  farads,
  microfarads,
  nanofarads,
  picofarads,
  henries,
  webers,
  teslas,
  lumens,
  lux,
  becquerels,
  grays,
  sieverts,
];

export function parse(input: string): Quantity<number, dim.Dimensions> {
  return parseBase(input, allUnits);
}
