/**
 * Consolidated dimension types for all physical quantities.
 *
 * This module contains all dimension types used by the ts-units library.
 * Dimensions are represented as objects with exponents for each base quantity.
 *
 * @module
 */

import * as exp from "./exponent.ts";
import type { Exponent } from "./exponent.ts";

// ============================================================================
// Core Dimension Infrastructure
// ============================================================================

/**
 * The dimensions of a quantity.
 *
 * For example, the dimensions of a length (`[L]`) will be represented as
 * `{length: 1}` and those of an area (`[L]²`) as `{length: 2}`. The
 * dimensions of speed (`[L][T]^-1`) as `{length: 1, time: -1}`.
 *
 * Note that the dimensions of a quantity can also be the empty set. We do not
 * represent exponents as 0 but as undefined so a ratio `[L]/[L] = [1]` or
 * simply `{}`. In these cases we say that a quantity is dimensionless or that
 * it is a quantity of dimension one.
 *
 * Dimension types is how this library ensures type safety. In particular, we
 * currently do not ensure type safety for different quantity kinds of the same
 * dimensions. For example, both planar angles (`[L]/[L]`) and solid angles
 * (`[L]^2/[L]^2`) collapse to `[1]` and therefore cannot be distinguished in
 * variable assignments.
 */
export const Brand: unique symbol = Symbol("Brand");

export interface Branding {
  readonly [Brand]?: symbol;
}

export type Dimensions =
  & Readonly<
    {
      [key: string]: Exponent;
    }
  >
  & Branding;

/**
 * The dimensions of a dimensionless quantity. Also known as the dimensions of
 * the "quantity of dimension one".
 *
 * Denoted as `[1]`.
 */
export type One = Dimensions;
export const One: One = {};

// ============================================================================
// Dimension Arithmetic Types and Functions
// ============================================================================

/**
 * Multiplies two dimensions, adding their exponents.
 */
export type Times<A extends Dimensions, B extends Multiplicand<A>> = {
  [
    K in keyof A | keyof B as K extends typeof Brand ? never
      : exp.Add<Get<A, K>, Get<B, K>> extends undefined ? never
      : K
  ]: exp.Add<Get<A, K>, Get<B, K>>;
};

export function Times<A extends Dimensions, B extends Multiplicand<A>>(
  a: A,
  b: B,
): Times<A, B> {
  return combineExponents(a, b, (a, b) => a + b) as Times<A, B>;
}

/**
 * Returns the types that can be multiplied with the given dimensions without
 * overflowing exponents.
 */
// prettier-ignore
export type Multiplicand<A extends Dimensions> =
  & Partial<
    {
      [K in keyof A as K extends typeof Brand ? never : K]: exp.Addable<
        Get<A, K>
      >;
    }
  >
  & Dimensions;

/**
 * Divides two dimensions, subtracting the exponents.
 */
export type Over<A extends Dimensions, B extends Divisor<A>> = {
  [
    K in keyof A | keyof B as K extends typeof Brand ? never
      : exp.Subtract<Get<A, K>, Get<B, K>> extends undefined ? never
      : K
  ]: exp.Subtract<Get<A, K>, Get<B, K>>;
};

export function Over<A extends Dimensions, B extends Divisor<A>>(
  a: A,
  b: B,
): Over<A, B> {
  return combineExponents(a, b, (a, b) => a - b) as Over<A, B>;
}

/**
 * Returns the types that can act as divisors of the given dimensions without
 * overflowing exponents.
 */
// prettier-ignore
export type Divisor<A extends Dimensions> =
  & Partial<
    {
      [K in keyof A as K extends typeof Brand ? never : K]: exp.Subtractable<
        Get<A, K>
      >;
    }
  >
  & Dimensions;

/**
 * Returns the reciprocal dimension, negating the exponents.
 */
export type Reciprocal<X extends Dimensions> = {
  [K in keyof X as K extends typeof Brand ? never : K]: exp.Negate<Get<X, K>>;
};

export function Reciprocal<X extends Dimensions>(x: X): Reciprocal<X> {
  return combineExponents({}, x, (_, x) => -x) as Reciprocal<X>;
}

/**
 * Returns the squared dimension, doubling the exponents.
 */
export type Squared<X extends Dimensions> = {
  [K in keyof X as K extends typeof Brand ? never : K]: exp.Double<Get<X, K>>;
};

export function Squared<X extends Dimensions>(x: X): Squared<X> {
  return combineExponents({}, x, (_, x) => 2 * x) as Squared<X>;
}

/**
 * Returns the cubed dimension, tripling the exponents.
 */
export type Cubed<X extends Dimensions> = {
  [K in keyof X as K extends typeof Brand ? never : K]: exp.Triple<Get<X, K>>;
};

export function Cubed<X extends Dimensions>(x: X): Cubed<X> {
  return combineExponents({}, x, (_, x) => 3 * x) as Cubed<X>;
}

/**
 * Retrieves the exponent of a given dimension in set of dimensions.
 */
type Get<D extends Dimensions, K> = K extends keyof D ? D[K]
  : undefined;

function combineExponents(
  d1: Dimensions,
  d2: Dimensions,
  f: (e1: number, e2: number) => number,
): Dimensions {
  const keys = new Set<string>();
  Object.keys(d1).forEach((x) => {
    if (x !== "_brand") keys.add(x);
  });
  Object.keys(d2).forEach((x) => {
    if (x !== "_brand") keys.add(x);
  });

  const ret: Record<string, Exponent> = {};
  for (const key of keys) {
    const v1 = d1[key] as Exponent;
    const v2 = d2[key] as Exponent;
    const val = f(v1 || 0, v2 || 0);
    if (!val) {
      continue;
    }

    if (!exp.isExponent(val)) {
      throw new Error(
        `Overflow in ${key} when combining ${v1} and ${v2}`,
      );
    }

    ret[key] = val;
  }

  return ret;
}

// ============================================================================
// SI Base Quantities
// ============================================================================

/** The dimensions of the SI base quantity of length. Denoted by `[L]`. */
export type Length = { length: 1; readonly [Brand]?: unique symbol };
export const Length: Length = { length: 1 };

/** The dimensions of the SI base quantity of mass. Denoted by `[M]`. */
export type Mass = { mass: 1; readonly [Brand]?: unique symbol };
export const Mass: Mass = { mass: 1 };

/** The dimensions of the SI base quantity of time. Denoted by `[T]`. */
export type Time = { time: 1; readonly [Brand]?: unique symbol };
export const Time: Time = { time: 1 };

/** The dimensions of the SI base quantity of electric current. Denoted by `[I]`. */
export type Current = { electricCurrent: 1; readonly [Brand]?: unique symbol };
export const Current: Current = { electricCurrent: 1 };

/** The dimensions of the SI base quantity of thermodynamic temperature. Denoted by `[Θ]`. */
export type Temperature = { temperature: 1; readonly [Brand]?: unique symbol };
export const Temperature: Temperature = { temperature: 1 };

/** The dimensions of the SI base quantity of amount of substance. Denoted by `[N]`. */
export type AmountOfSubstance = {
  amountOfSubstance: 1;
  readonly [Brand]?: unique symbol;
};
export const AmountOfSubstance: AmountOfSubstance = { amountOfSubstance: 1 };

/** The dimensions of the SI base quantity of luminous intensity. Denoted by `[J]`. */
export type LuminousIntensity = {
  luminousIntensity: 1;
  readonly [Brand]?: unique symbol;
};
export const LuminousIntensity: LuminousIntensity = { luminousIntensity: 1 };

// ============================================================================
// Dimensionless Quantities
// ============================================================================

/** The dimensions of a scalar (dimensionless) quantity. */
export type Scalar = { readonly [Brand]?: unique symbol };
export const Scalar: Scalar = {};

/** The dimensions of a planar angle. Denoted by `[1]` (dimensionless). */
export type Angle = { readonly [Brand]?: unique symbol };
export const Angle: Angle = {};

/** The dimensions of a solid angle. Denoted by `[1]` (dimensionless). */
export type SolidAngle = { readonly [Brand]?: unique symbol };
export const SolidAngle: SolidAngle = {};

// ============================================================================
// Derived Mechanical Quantities
// ============================================================================

/** The dimensions of area. Denoted by `[L]^2`. */
export type Area = { length: 2; readonly [Brand]?: unique symbol };
export const Area: Area = { length: 2 };

/** The dimensions of volume. Denoted by `[L]^3`. */
export type Volume = { length: 3; readonly [Brand]?: unique symbol };
export const Volume: Volume = { length: 3 };

/** The dimensions of speed. Denoted by `[L][T]^-1`. */
export type Speed = { length: 1; time: -1; readonly [Brand]?: unique symbol };
export const Speed: Speed = { length: 1, time: -1 };

/** The dimensions of acceleration. Denoted by `[L][T]^-2`. */
export type Acceleration = {
  length: 1;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const Acceleration: Acceleration = { length: 1, time: -2 };

/** The dimensions of angular speed. Denoted by `[T]^-1`. */
export type AngularSpeed = { time: -1; readonly [Brand]?: unique symbol };
export const AngularSpeed: AngularSpeed = { time: -1 };

/** The dimensions of frequency. Denoted by `[T]^-1`. */
export type Frequency = { time: -1; readonly [Brand]?: unique symbol };
export const Frequency: Frequency = { time: -1 };

/** The dimensions of force. Denoted by `[M][L][T]^-2`. */
export type Force = {
  mass: 1;
  length: 1;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const Force: Force = { mass: 1, length: 1, time: -2 };

/** The dimensions of energy/work. Denoted by `[M][L]^2[T]^-2`. */
export type Energy = {
  mass: 1;
  length: 2;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const Energy: Energy = { mass: 1, length: 2, time: -2 };

/** The dimensions of power. Denoted by `[M][L]^2[T]^-3`. */
export type Power = {
  mass: 1;
  length: 2;
  time: -3;
  readonly [Brand]?: unique symbol;
};
export const Power: Power = { mass: 1, length: 2, time: -3 };

/** The dimensions of pressure. Denoted by `[M][L]^-1[T]^-2`. */
export type Pressure = {
  mass: 1;
  length: -1;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const Pressure: Pressure = { mass: 1, length: -1, time: -2 };

// ============================================================================
// Electrical Quantities
// ============================================================================

/** The dimensions of electric charge. Denoted by `[T][I]`. */
export type Charge = {
  time: 1;
  electricCurrent: 1;
  readonly [Brand]?: unique symbol;
};
export const Charge: Charge = { time: 1, electricCurrent: 1 };

/** The dimensions of voltage. Denoted by `[M][L]^2[T]^-3[I]^-1`. */
export type Voltage = {
  mass: 1;
  length: 2;
  time: -3;
  electricCurrent: -1;
  readonly [Brand]?: unique symbol;
};
export const Voltage: Voltage = {
  mass: 1,
  length: 2,
  time: -3,
  electricCurrent: -1,
};

/** The dimensions of electric resistance. Denoted by `[M][L]^2[T]^-3[I]^-2`. */
export type Resistance = {
  mass: 1;
  length: 2;
  time: -3;
  electricCurrent: -2;
  readonly [Brand]?: unique symbol;
};
export const Resistance: Resistance = {
  mass: 1,
  length: 2,
  time: -3,
  electricCurrent: -2,
};

/** The dimensions of electrical conductance. Denoted by `[M]^-1[L]^-2[T]^3[I]^2`. */
export type Conductance = {
  mass: -1;
  length: -2;
  time: 3;
  electricCurrent: 2;
  readonly [Brand]?: unique symbol;
};
export const Conductance: Conductance = {
  mass: -1,
  length: -2,
  time: 3,
  electricCurrent: 2,
};

/** The dimensions of capacitance. Denoted by `[M]^-1[L]^-2[T]^4[I]^2`. */
export type Capacitance = {
  mass: -1;
  length: -2;
  time: 4;
  electricCurrent: 2;
  readonly [Brand]?: unique symbol;
};
export const Capacitance: Capacitance = {
  mass: -1,
  length: -2,
  time: 4,
  electricCurrent: 2,
};

/** The dimensions of inductance. Denoted by `[M][L]^2[T]^-2[I]^-2`. */
export type Inductance = {
  mass: 1;
  length: 2;
  time: -2;
  electricCurrent: -2;
  readonly [Brand]?: unique symbol;
};
export const Inductance: Inductance = {
  mass: 1,
  length: 2,
  time: -2,
  electricCurrent: -2,
};

// ============================================================================
// Magnetic Quantities
// ============================================================================

/** The dimensions of magnetic flux. Denoted by `[M][L]^2[T]^-2[I]^-1`. */
export type MagneticFlux = {
  mass: 1;
  length: 2;
  time: -2;
  electricCurrent: -1;
  readonly [Brand]?: unique symbol;
};
export const MagneticFlux: MagneticFlux = {
  mass: 1,
  length: 2,
  time: -2,
  electricCurrent: -1,
};

/** The dimensions of magnetic induction (flux density). Denoted by `[M][T]^-2[I]^-1`. */
export type MagneticInduction = {
  mass: 1;
  time: -2;
  electricCurrent: -1;
  readonly [Brand]?: unique symbol;
};
export const MagneticInduction: MagneticInduction = {
  mass: 1,
  time: -2,
  electricCurrent: -1,
};

// ============================================================================
// Luminous Quantities
// ============================================================================

/** The dimensions of luminous flux. Denoted by `[J]`. */
export type LuminousFlux = {
  luminousIntensity: 1;
  readonly [Brand]?: unique symbol;
};
export const LuminousFlux: LuminousFlux = { luminousIntensity: 1 };

/** The dimensions of illuminance. Denoted by `[J][L]^-2`. */
export type Illuminance = {
  luminousIntensity: 1;
  length: -2;
  readonly [Brand]?: unique symbol;
};
export const Illuminance: Illuminance = { luminousIntensity: 1, length: -2 };

// ============================================================================
// Radioactive Quantities
// ============================================================================

/** The dimensions of radioactivity (decay rate). Denoted by `[T]^-1`. */
export type Radioactivity = { time: -1; readonly [Brand]?: unique symbol };
export const Radioactivity: Radioactivity = { time: -1 };

/** The dimensions of absorbed dose. Denoted by `[L]^2[T]^-2`. */
export type AbsorbedDose = {
  length: 2;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const AbsorbedDose: AbsorbedDose = { length: 2, time: -2 };

/** The dimensions of equivalent dose. Denoted by `[L]^2[T]^-2`. */
export type EquivalentDose = {
  length: 2;
  time: -2;
  readonly [Brand]?: unique symbol;
};
export const EquivalentDose: EquivalentDose = { length: 2, time: -2 };
