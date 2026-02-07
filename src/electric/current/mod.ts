import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../../unit.ts";

/** A quantity of electric current. */
export type Current<NumberType = number> = Quantity<
  NumberType,
  dimension.Current
>;

/** A unit of electric current. */
type CurrentUnit<T> = Unit<T, dimension.Current>;

/**
 * Creates electric current units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with electric current unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  amperes: CurrentUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /**
   * The ampere, symbol `A`, is the SI base unit of electric current.
   */
  const amperes = makeUnit("A", dimension.Current);

  return { amperes };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The ampere, symbol `A`, is the SI base unit of electric current.
 */
export const amperes = _units.amperes;
