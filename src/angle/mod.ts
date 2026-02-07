import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { type Geometric, NativeGeometric } from "../geometric.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../unit.ts";

/** A quantity of planar angle. */
export type Angle<NumberType = number> = Quantity<NumberType, dimension.Angle>;

/** A unit of angle. */
type AngleUnit<T> = Unit<T, dimension.Angle>;

/**
 * Creates angle units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @param geometric The geometric implementation to use.
 * @returns An object with angle unit definitions and trigonometric functions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
  geometric: Geometric<NumberType>,
): {
  radians: AngleUnit<NumberType>;
  degrees: AngleUnit<NumberType>;
  gradians: AngleUnit<NumberType>;
  turns: AngleUnit<NumberType>;
  sin: (x: Angle<NumberType>) => NumberType;
  cos: (x: Angle<NumberType>) => NumberType;
  tan: (x: Angle<NumberType>) => NumberType;
  asin: (x: NumberType) => Angle<NumberType>;
  acos: (x: NumberType) => Angle<NumberType>;
  atan: (x: NumberType) => Angle<NumberType>;
  atan2: (x: NumberType, y: NumberType) => Angle<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);
  const { toNative } = arithmetic;
  const {
    sin: geoSin,
    cos: geoCos,
    tan: geoTan,
    asin: geoAsin,
    acos: geoAcos,
    atan: geoAtan,
    atan2: geoAtan2,
  } = geometric;

  /** The radian, symbol `rad`, is the SI unit for planar angle. */
  const radians = makeUnit("rad", dimension.Angle);

  /** One degree equals π/180 radians. */
  const degrees = radians.times(Math.PI).per(180).withSymbol("°");
  const gradians = radians.times(Math.PI).per(200).withSymbol("gon");

  /** One turn equals 2π radians. */
  const turns = radians.times(2).times(Math.PI).withSymbol("τ");

  /**
   * Returns the sine of an angle.
   * @param x An Angle
   */
  function sin(x: Angle<NumberType>): NumberType {
    return geoSin(x.in(radians).amount);
  }

  /**
   * Returns the cosine of an angle.
   * @param x An Angle
   */
  function cos(x: Angle<NumberType>): NumberType {
    return geoCos(x.in(radians).amount);
  }

  /**
   * Returns the tangent of an angle.
   * @param x An Angle
   */
  function tan(x: Angle<NumberType>): NumberType {
    return geoTan(x.in(radians).amount);
  }

  /**
   * Returns the arcsine of a number.
   * @param x A numeric expression.
   */
  function asin(x: NumberType): Angle<NumberType> {
    return radians(toNative(geoAsin(x)));
  }

  /**
   * Returns the arc cosine (or inverse cosine) of a number.
   * @param x A numeric expression.
   */
  function acos(x: NumberType): Angle<NumberType> {
    return radians(toNative(geoAcos(x)));
  }

  /**
   * Returns the arctangent of a number.
   * @param x A numeric expression.
   */
  function atan(x: NumberType): Angle<NumberType> {
    return radians(toNative(geoAtan(x)));
  }

  /**
   * Returns the angle from the X axis to a point.
   * @param x A numeric expression representing the cartesian x-coordinate.
   * @param y A numeric expression representing the cartesian y-coordinate.
   */
  function atan2(x: NumberType, y: NumberType): Angle<NumberType> {
    return radians(toNative(geoAtan2(x, y)));
  }

  return {
    radians,
    degrees,
    gradians,
    turns,
    sin,
    cos,
    tan,
    asin,
    acos,
    atan,
    atan2,
  };
}

const _units: {
  radians: Unit<number, dimension.Angle>;
  degrees: Unit<number, dimension.Angle>;
  gradians: Unit<number, dimension.Angle>;
  turns: Unit<number, dimension.Angle>;
  sin: (x: Angle<number>) => number;
  cos: (x: Angle<number>) => number;
  tan: (x: Angle<number>) => number;
  asin: (x: number) => Angle<number>;
  acos: (x: number) => Angle<number>;
  atan: (x: number) => Angle<number>;
  atan2: (x: number, y: number) => Angle<number>;
} = withValueType(NativeArithmetic, NativeGeometric);

/** The radian, symbol `rad`, is the SI unit for planar angle. */
export const radians = _units.radians;

/** One degree equals π/180 radians. */
export const degrees = _units.degrees;

/** One turn equals 2π radians. */
export const turns = _units.turns;

/** One gradian equals π/200 radians. */
export const gradians = _units.gradians;

/**
 * Returns the sine of an angle.
 * @param x An Angle
 */
export const sin = _units.sin;

/**
 * Returns the cosine of an angle.
 * @param x An Angle
 */
export const cos = _units.cos;

/**
 * Returns the tangent of an angle.
 * @param x An Angle
 */
export const tan = _units.tan;

/**
 * Returns the arcsine of a number.
 * @param x A numeric expression.
 */
export const asin = _units.asin;

/**
 * Returns the arc cosine (or inverse cosine) of a number.
 * @param x A numeric expression.
 */
export const acos = _units.acos;

/**
 * Returns the arctangent of a number.
 * @param x A numeric expression.
 */
export const atan = _units.atan;

/**
 * Returns the angle from the X axis to a point.
 * @param x A numeric expression representing the cartesian x-coordinate.
 * @param y A numeric expression representing the cartesian y-coordinate.
 */
export const atan2 = _units.atan2;
