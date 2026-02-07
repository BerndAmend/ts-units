import type { Quantity, Unit } from "./unit.ts";
import type { Dimensions } from "./dimension.ts";
import { parse as parseBase } from "./parse.ts";

export {
  hours,
  microseconds,
  milliseconds,
  minutes,
  msec,
  nanoseconds,
  nsec,
  s,
  seconds,
  usec,
} from "./time/mod.ts";
export { mole } from "./amountOfSubstance/mod.ts";
export { atmospheres, bar, millibar, pascals, psi } from "./pressure/mod.ts";
export { squareMeters } from "./area/mod.ts";
export { squareDegrees, steradians } from "./angle/solid/mod.ts";
export {
  acos,
  asin,
  atan,
  atan2,
  cos,
  degrees,
  gradians,
  radians,
  sin,
  tan,
  turns,
} from "./angle/mod.ts";
export { becquerels } from "./radioactive/decay/mod.ts";
export { grays, sieverts } from "./radioactive/dose/mod.ts";
export { ohms } from "./electric/resistance/mod.ts";
export { amperes } from "./electric/current/mod.ts";
export { siemens } from "./electric/conductance/mod.ts";
export {
  farads,
  microfarads,
  nanofarads,
  picofarads,
} from "./electric/capacitance/mod.ts";
export { coulombs } from "./electric/charge/mod.ts";
export { henries } from "./electric/inductance/mod.ts";
export { volts } from "./electric/voltage/mod.ts";
export { hertz } from "./frequency/mod.ts";
export { webers } from "./magnetic/flux/mod.ts";
export { teslas } from "./magnetic/induction/mod.ts";
export { candelas } from "./luminous/intensity/mod.ts";
export { lux } from "./luminous/illuminance/mod.ts";
export { lumens } from "./luminous/flux/mod.ts";
export {
  calories,
  electronvolts,
  joules,
  kilocalories,
  kilojoules,
  kilowattHours,
} from "./energy/mod.ts";
export {
  cubicMeters,
  cups,
  fluidOunces,
  gallons,
  liters,
  milliliters,
} from "./volume/mod.ts";
export {
  angstroms,
  astronomicalUnits,
  centimeters,
  chains,
  fathoms,
  feet,
  femtometers,
  fermi,
  furlongs,
  inches,
  kilometers,
  meters,
  micrometers,
  microns,
  miles,
  millimeters,
  nanometers,
  nauticalMiles,
  picometers,
  yards,
} from "./length/mod.ts";
export { celsius, fahrenheit, kelvin, rankine } from "./temperature/mod.ts";
export { percent, permille, permyriad, scalar } from "./scalar/mod.ts";
export {
  grams,
  kilograms,
  micrograms,
  milligrams,
  ounces,
  pounds,
  tonnes,
} from "./mass/mod.ts";
export { watts } from "./power/mod.ts";
export { degreesPerSecond, radiansPerSecond } from "./angularSpeed/mod.ts";
export { newtons } from "./force/mod.ts";
export {
  feetPerSecond,
  kilometersPerHour,
  knots,
  metersPerSecond,
  milesPerHour,
} from "./speed/mod.ts";
export { metersPerSecondSquared } from "./acceleration/mod.ts";

// Import all for the array
import * as unit_ns_0 from "./time/mod.ts";
import * as unit_ns_1 from "./amountOfSubstance/mod.ts";
import * as unit_ns_2 from "./pressure/mod.ts";
import * as unit_ns_3 from "./area/mod.ts";
import * as unit_ns_4 from "./angle/solid/mod.ts";
import * as unit_ns_5 from "./angle/mod.ts";
import * as unit_ns_6 from "./radioactive/decay/mod.ts";
import * as unit_ns_7 from "./radioactive/dose/mod.ts";
import * as unit_ns_8 from "./electric/resistance/mod.ts";
import * as unit_ns_9 from "./electric/current/mod.ts";
import * as unit_ns_10 from "./electric/conductance/mod.ts";
import * as unit_ns_11 from "./electric/capacitance/mod.ts";
import * as unit_ns_12 from "./electric/charge/mod.ts";
import * as unit_ns_13 from "./electric/inductance/mod.ts";
import * as unit_ns_14 from "./electric/voltage/mod.ts";
import * as unit_ns_15 from "./frequency/mod.ts";
import * as unit_ns_16 from "./magnetic/flux/mod.ts";
import * as unit_ns_17 from "./magnetic/induction/mod.ts";
import * as unit_ns_18 from "./luminous/intensity/mod.ts";
import * as unit_ns_19 from "./luminous/illuminance/mod.ts";
import * as unit_ns_20 from "./luminous/flux/mod.ts";
import * as unit_ns_21 from "./energy/mod.ts";
import * as unit_ns_22 from "./volume/mod.ts";
import * as unit_ns_23 from "./length/mod.ts";
import * as unit_ns_24 from "./temperature/mod.ts";
import * as unit_ns_25 from "./scalar/mod.ts";
import * as unit_ns_26 from "./mass/mod.ts";
import * as unit_ns_27 from "./power/mod.ts";
import * as unit_ns_28 from "./angularSpeed/mod.ts";
import * as unit_ns_29 from "./force/mod.ts";
import * as unit_ns_30 from "./speed/mod.ts";
import * as unit_ns_31 from "./acceleration/mod.ts";

/**
 * An array of all units in the library.
 */
// deno-lint-ignore no-explicit-any
export const allUnits: Unit<number, any>[] = [
  unit_ns_0.hours,
  unit_ns_0.microseconds,
  unit_ns_0.milliseconds,
  unit_ns_0.minutes,
  unit_ns_0.msec,
  unit_ns_0.nanoseconds,
  unit_ns_0.nsec,
  unit_ns_0.s,
  unit_ns_0.seconds,
  unit_ns_0.usec,
  unit_ns_1.mole,
  unit_ns_2.atmospheres,
  unit_ns_2.bar,
  unit_ns_2.millibar,
  unit_ns_2.pascals,
  unit_ns_2.psi,
  unit_ns_3.squareMeters,
  unit_ns_4.squareDegrees,
  unit_ns_4.steradians,
  unit_ns_5.degrees,
  unit_ns_5.gradians,
  unit_ns_5.radians,
  unit_ns_5.turns,
  unit_ns_6.becquerels,
  unit_ns_7.grays,
  unit_ns_7.sieverts,
  unit_ns_8.ohms,
  unit_ns_9.amperes,
  unit_ns_10.siemens,
  unit_ns_11.farads,
  unit_ns_11.microfarads,
  unit_ns_11.nanofarads,
  unit_ns_11.picofarads,
  unit_ns_12.coulombs,
  unit_ns_13.henries,
  unit_ns_14.volts,
  unit_ns_15.hertz,
  unit_ns_16.webers,
  unit_ns_17.teslas,
  unit_ns_18.candelas,
  unit_ns_19.lux,
  unit_ns_20.lumens,
  unit_ns_21.calories,
  unit_ns_21.electronvolts,
  unit_ns_21.joules,
  unit_ns_21.kilocalories,
  unit_ns_21.kilojoules,
  unit_ns_21.kilowattHours,
  unit_ns_22.cubicMeters,
  unit_ns_22.cups,
  unit_ns_22.fluidOunces,
  unit_ns_22.gallons,
  unit_ns_22.liters,
  unit_ns_22.milliliters,
  unit_ns_23.angstroms,
  unit_ns_23.astronomicalUnits,
  unit_ns_23.centimeters,
  unit_ns_23.chains,
  unit_ns_23.fathoms,
  unit_ns_23.feet,
  unit_ns_23.femtometers,
  unit_ns_23.fermi,
  unit_ns_23.furlongs,
  unit_ns_23.inches,
  unit_ns_23.kilometers,
  unit_ns_23.meters,
  unit_ns_23.micrometers,
  unit_ns_23.microns,
  unit_ns_23.miles,
  unit_ns_23.millimeters,
  unit_ns_23.nanometers,
  unit_ns_23.nauticalMiles,
  unit_ns_23.picometers,
  unit_ns_23.yards,
  unit_ns_24.celsius,
  unit_ns_24.fahrenheit,
  unit_ns_24.kelvin,
  unit_ns_24.rankine,
  unit_ns_25.percent,
  unit_ns_25.permille,
  unit_ns_25.permyriad,
  unit_ns_25.scalar,
  unit_ns_26.grams,
  unit_ns_26.kilograms,
  unit_ns_26.micrograms,
  unit_ns_26.milligrams,
  unit_ns_26.ounces,
  unit_ns_26.pounds,
  unit_ns_26.tonnes,
  unit_ns_27.watts,
  unit_ns_28.degreesPerSecond,
  unit_ns_28.radiansPerSecond,
  unit_ns_29.newtons,
  unit_ns_30.feetPerSecond,
  unit_ns_30.kilometersPerHour,
  unit_ns_30.knots,
  unit_ns_30.metersPerSecond,
  unit_ns_30.milesPerHour,
  unit_ns_31.metersPerSecondSquared,
];

export function parse(input: string): Quantity<number, Dimensions> {
  return parseBase(input, allUnits);
}
