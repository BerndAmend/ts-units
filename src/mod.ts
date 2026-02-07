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
export { pascals } from "./pressure/mod.ts";
export { squareMeters } from "./area/mod.ts";
export { squareDegrees, steradians } from "./angle/solid/mod.ts";
export {
  acos,
  asin,
  atan,
  atan2,
  cos,
  degrees,
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
export { joules } from "./energy/mod.ts";
export { cubicMeters } from "./volume/mod.ts";
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
export { grams, kilograms } from "./mass/mod.ts";
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
import * as unit_ns_1 from "./pressure/mod.ts";
import * as unit_ns_2 from "./area/mod.ts";
import * as unit_ns_3 from "./angle/solid/mod.ts";
import * as unit_ns_4 from "./angle/mod.ts";
import * as unit_ns_5 from "./radioactive/decay/mod.ts";
import * as unit_ns_6 from "./radioactive/dose/mod.ts";
import * as unit_ns_7 from "./electric/resistance/mod.ts";
import * as unit_ns_8 from "./electric/current/mod.ts";
import * as unit_ns_9 from "./electric/conductance/mod.ts";
import * as unit_ns_10 from "./electric/capacitance/mod.ts";
import * as unit_ns_11 from "./electric/charge/mod.ts";
import * as unit_ns_12 from "./electric/inductance/mod.ts";
import * as unit_ns_13 from "./electric/voltage/mod.ts";
import * as unit_ns_14 from "./frequency/mod.ts";
import * as unit_ns_15 from "./magnetic/flux/mod.ts";
import * as unit_ns_16 from "./magnetic/induction/mod.ts";
import * as unit_ns_17 from "./luminous/intensity/mod.ts";
import * as unit_ns_18 from "./luminous/illuminance/mod.ts";
import * as unit_ns_19 from "./luminous/flux/mod.ts";
import * as unit_ns_20 from "./energy/mod.ts";
import * as unit_ns_21 from "./volume/mod.ts";
import * as unit_ns_22 from "./length/mod.ts";
import * as unit_ns_23 from "./temperature/mod.ts";
import * as unit_ns_24 from "./scalar/mod.ts";
import * as unit_ns_25 from "./mass/mod.ts";
import * as unit_ns_26 from "./power/mod.ts";
import * as unit_ns_27 from "./angularSpeed/mod.ts";
import * as unit_ns_28 from "./force/mod.ts";
import * as unit_ns_29 from "./speed/mod.ts";
import * as unit_ns_30 from "./acceleration/mod.ts";

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
  unit_ns_1.pascals,
  unit_ns_2.squareMeters,
  unit_ns_3.squareDegrees,
  unit_ns_3.steradians,
  unit_ns_4.degrees,
  unit_ns_4.radians,
  unit_ns_4.turns,
  unit_ns_5.becquerels,
  unit_ns_6.grays,
  unit_ns_6.sieverts,
  unit_ns_7.ohms,
  unit_ns_8.amperes,
  unit_ns_9.siemens,
  unit_ns_10.farads,
  unit_ns_10.microfarads,
  unit_ns_10.nanofarads,
  unit_ns_10.picofarads,
  unit_ns_11.coulombs,
  unit_ns_12.henries,
  unit_ns_13.volts,
  unit_ns_14.hertz,
  unit_ns_15.webers,
  unit_ns_16.teslas,
  unit_ns_17.candelas,
  unit_ns_18.lux,
  unit_ns_19.lumens,
  unit_ns_20.joules,
  unit_ns_21.cubicMeters,
  unit_ns_22.angstroms,
  unit_ns_22.astronomicalUnits,
  unit_ns_22.centimeters,
  unit_ns_22.chains,
  unit_ns_22.fathoms,
  unit_ns_22.feet,
  unit_ns_22.femtometers,
  unit_ns_22.fermi,
  unit_ns_22.furlongs,
  unit_ns_22.inches,
  unit_ns_22.kilometers,
  unit_ns_22.meters,
  unit_ns_22.micrometers,
  unit_ns_22.microns,
  unit_ns_22.miles,
  unit_ns_22.millimeters,
  unit_ns_22.nanometers,
  unit_ns_22.nauticalMiles,
  unit_ns_22.picometers,
  unit_ns_22.yards,
  unit_ns_23.celsius,
  unit_ns_23.fahrenheit,
  unit_ns_23.kelvin,
  unit_ns_23.rankine,
  unit_ns_24.percent,
  unit_ns_24.permille,
  unit_ns_24.permyriad,
  unit_ns_24.scalar,
  unit_ns_25.grams,
  unit_ns_25.kilograms,
  unit_ns_26.watts,
  unit_ns_27.degreesPerSecond,
  unit_ns_27.radiansPerSecond,
  unit_ns_28.newtons,
  unit_ns_29.feetPerSecond,
  unit_ns_29.kilometersPerHour,
  unit_ns_29.knots,
  unit_ns_29.metersPerSecond,
  unit_ns_29.milesPerHour,
  unit_ns_30.metersPerSecondSquared,
];

export function parse(input: string): Quantity<number, Dimensions> {
  return parseBase(input, allUnits);
}
