import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as lengthWithValueType } from "../../length/mod.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of a radioactive dose. */
export type Dose<NumberType = number> = Quantity<NumberType, dimension.Dose>;

/** A unit of radioactive dose. */
type DoseUnit<T> = Unit<T, dimension.Dose>;

/**
 * Creates radioactive dose units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with radioactive dose unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  grays: DoseUnit<NumberType>;
  sieverts: DoseUnit<NumberType>;
} {
  const { meters } = lengthWithValueType(arithmetic);
  const { seconds } = timeWithValueType(arithmetic);

  /** The gray, symbol `Gy`, is the SI unit for absorbed dose. */
  const grays: Unit<NumberType, dimension.Dose> = meters
    .squared()
    .per(seconds.squared())
    .withSymbol("Gy");

  /** The sievert, symbol `Sv`, is the SI unit for equivalent dose. */
  const sieverts: Unit<NumberType, dimension.Dose> = meters
    .squared()
    .per(seconds.squared())
    .withSymbol("Sv");

  return { grays, sieverts };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The gray, symbol `Gy`, is the SI unit for absorbed dose. */
export const grays = _units.grays;

/** The sievert, symbol `Sv`, is the SI unit for equivalent dose. */
export const sieverts = _units.sieverts;
