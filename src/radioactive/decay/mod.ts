import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as timeWithValueType } from "../../time/mod.ts";

/** A quantity of radioactivity. */
export type Radioactivity<NumberType = number> = Quantity<
  NumberType,
  dimension.Radioactivity
>;

/** A unit of radioactivity. */
type RadioactivityUnit<T> = Unit<T, dimension.Radioactivity>;

/**
 * Creates radioactivity units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with radioactivity unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  becquerels: RadioactivityUnit<NumberType>;
} {
  const { seconds } = timeWithValueType(arithmetic);

  /** The becquerel, symbol `Bq`, is the SI unit for radioactivity. */
  const becquerels: Unit<NumberType, dimension.Radioactivity> = seconds
    .reciprocal()
    .withSymbol("Bq");

  return { becquerels };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The becquerel, symbol `Bq`, is the SI unit for radioactivity. */
export const becquerels = _units.becquerels;
