import * as dimension from "./dimension.ts";
import { type Arithmetic, NativeArithmetic } from "../arithmetic.ts";
import { makeUnitFactory, type Quantity, type Unit } from "../unit.ts";

/** A quantity of time. */
export type Time<NumberType = number> = Quantity<NumberType, dimension.Time>;

/** A unit of time. */
type TimeUnit<T> = Unit<T, dimension.Time>;

/**
 * Creates time units with a custom arithmetic type.
 * @param arithmetic The arithmetic implementation to use.
 * @returns An object with time unit definitions.
 */
export function withValueType<NumberType>(
  arithmetic: Arithmetic<NumberType>,
): {
  seconds: TimeUnit<NumberType>;
  milliseconds: TimeUnit<NumberType>;
  microseconds: TimeUnit<NumberType>;
  nanoseconds: TimeUnit<NumberType>;
  s: TimeUnit<NumberType>;
  msec: TimeUnit<NumberType>;
  usec: TimeUnit<NumberType>;
  nsec: TimeUnit<NumberType>;
  minutes: TimeUnit<NumberType>;
  hours: TimeUnit<NumberType>;
} {
  const { makeUnit } = makeUnitFactory(arithmetic);

  /**
   * The second, symbol `s`, is the SI base unit of time. All other units in
   * this module are defined as scaled values of the second.
   */
  const seconds = makeUnit("s", dimension.Time);

  /** One millisecond equals 0.001 seconds. */
  const milliseconds = seconds.withSiPrefix("m");
  /** One microsecond equals 0.000001 seconds. */
  const microseconds = seconds.withSiPrefix("μ");
  /** One nanosecond equals 0.000000001 seconds. */
  const nanoseconds = seconds.withSiPrefix("n");

  /** Alias for seconds. */
  const s = seconds;
  /** Alias for milliseconds. */
  const msec = milliseconds;
  /** Alias for microseconds. */
  const usec = microseconds;
  /** Alias for nanoseconds. */
  const nsec = nanoseconds;

  /** One minute equals 60 seconds. */
  const minutes = seconds.times(60).withSymbol("m");
  /** One hour equals 60 minutes. */
  const hours = minutes.times(60).withSymbol("h");

  return {
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
  };
}

const _units: ReturnType<typeof withValueType<number>> = withValueType(
  NativeArithmetic,
);

/**
 * The second, symbol `s`, is the SI base unit of time.
 */
export const seconds = _units.seconds;

/** One millisecond equals 0.001 seconds. */
export const milliseconds = _units.milliseconds;

/** One microsecond equals 0.000001 seconds. */
export const microseconds = _units.microseconds;

/** One nanosecond equals 0.000000001 seconds. */
export const nanoseconds = _units.nanoseconds;

/** Alias for seconds. */
export const s = _units.s;

/** Alias for milliseconds. */
export const msec = _units.msec;

/** Alias for microseconds. */
export const usec = _units.usec;

/** Alias for nanoseconds. */
export const nsec = _units.nsec;

/** One minute equals 60 seconds. */
export const minutes = _units.minutes;

/** One hour equals 60 minutes. */
export const hours = _units.hours;
