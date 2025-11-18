import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { makeUnitFactory, type Quantity } from "../unit.ts";

/** A quantity of time. */
export type Time<NumberType = number> = Quantity<NumberType, dimension.Time>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const { makeUnit } = makeUnitFactory(arithmetic);

  class WithValueType {
    private constructor() {}

    /**
     * The second, symbol `s`, is the SI base unit of time. All other units in
     * this module are defined as scaled values of the second.
     */
    static seconds = makeUnit("s", dimension.Time);

    static milliseconds = WithValueType.seconds.withSiPrefix("m");
    static microseconds = WithValueType.seconds.withSiPrefix("μ");
    static nanoseconds = WithValueType.seconds.withSiPrefix("n");

    static s = WithValueType.seconds;
    static msec = WithValueType.milliseconds;
    static usec = WithValueType.microseconds;
    static nsec = WithValueType.nanoseconds;

    static minutes = WithValueType.seconds.times(60).withSymbol("m");
    static hours = WithValueType.minutes.times(60).withSymbol("h");
  }

  return WithValueType;
}

export const {
  seconds,
  milliseconds,
  microseconds,
  nanoseconds,
  s,
  msec,
  usec,
  nsec,
  minutes,
  hours,
} = withValueType(NativeArithmetic);
