import type * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../../arithmetic.ts";
import type { Quantity, Unit } from "../../unit.ts";
import { withValueType as intensityWithValueType } from "../intensity/mod.ts";
import { withValueType as solidAngleWithValueType } from "../../angle/solid/mod.ts";

/** A quantity of luminous flux. */
export type LuminousFlux<NumberType = number> = Quantity<
  NumberType,
  dimension.LuminousFlux
>;

/** A unit of luminous flux. */
type LuminousFluxUnit<T> = Unit<T, dimension.LuminousFlux>;

/**
 * Creates luminous flux units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with luminous flux unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  lumens: LuminousFluxUnit<NumberType>;
} {
  const { candelas } = intensityWithValueType(arithmetic);
  const { steradians } = solidAngleWithValueType(arithmetic);

  /** The lumen, symbol `lm`, is the SI unit for luminous flux. */
  const lumens: Unit<NumberType, dimension.LuminousFlux> = candelas
    .times(steradians)
    .withSymbol("lm");

  return { lumens };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/** The lumen, symbol `lm`, is the SI unit for luminous flux. */
export const lumens = _units.lumens;
