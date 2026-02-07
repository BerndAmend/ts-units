import * as dimension from "../dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../unit.ts";

/** A dimensionless scalar quantity. */
export type Scalar<NumberType = number> = Quantity<NumberType, dimension.One>;

/** A unit of scalar/dimensionless value. */
type ScalarUnit<T> = Unit<T, dimension.One>;

/**
 * Creates scalar units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with scalar unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  scalar: ScalarUnit<NumberType>;
  percent: ScalarUnit<NumberType>;
  permille: ScalarUnit<NumberType>;
  permyriad: ScalarUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /** The dimensionless scalar unit. */
  const scalar = makeUnit("", dimension.One);

  /** One percent equals 0.01. */
  const percent = scalar.times(1e-2).withSymbol("%");

  /** One permille equals 0.001. */
  const permille = scalar.times(1e-3).withSymbol("‰");

  /** One permyriad equals 0.0001 (basis point). */
  const permyriad = scalar.times(1e-4).withSymbol("‱");

  return { scalar, percent, permille, permyriad };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The dimensionless scalar unit. */
export const scalar = _units.scalar;

/** One percent equals 0.01. */
export const percent = _units.percent;

/** One permille equals 0.001. */
export const permille = _units.permille;

/** One permyriad equals 0.0001 (basis point). */
export const permyriad = _units.permyriad;
