import {
  Cubed,
  type Dimensions,
  type Over,
  Reciprocal,
  Squared,
  Times,
} from "ts-units";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

const _t1: Times<{ length: 1 }, { length: 1 }> = { length: 2 };
const _t2: Times<{ length: 1 }, { time: -1 }> = { length: 1, time: -1 };
const _t3: Times<{ length: 1 }, { length: -1 }> = {};
const _o1: Over<{ length: 1 }, { time: 1 }> = { length: 1, time: -1 };
const _o2: Over<{ length: 1 }, { length: 1 }> = {};
const _r1: Reciprocal<{ time: 1 }> = { time: -1 };
const _r2: Reciprocal<{ length: 1; time: -2 }> = { length: -1, time: 2 };
const _r3: Reciprocal<Dimensions> = {};
const _d1: Squared<{ time: 1 }> = { time: 2 };
const _d2: Squared<{ length: 1; time: -2 }> = { length: 2, time: -4 };
const _d3: Squared<Dimensions> = {};

describe("dimension", () => {
  describe("Times", () => {
    it("adds exponents", () => {
      type Length = { length: 1 };
      const length: Length = { length: 1 };

      type Area = { length: 2 };
      const area: Area = { length: 2 };

      type Volume = { length: 3 };
      const volume: Volume = Times(length, area);

      expect(volume).toEqual({ length: 3 });
    });

    it("clears 0 exponents", () => {
      type Time = { time: 1 };
      const time: Time = { time: 1 };

      type Speed = { length: 1; time: -1 };
      const speed: Speed = { length: 1, time: -1 };

      type Length = { length: 1 };
      const length: Length = Times(time, speed);

      expect(length).toEqual({ length: 1 });
    });

    it("throws error on runtime exponent overflow", () => {
      const foo: Dimensions = { foo: 4 };
      expect(() => Times(foo, foo)).toThrow("Overflow in foo");
    });
  });

  describe("Reciprocal", () => {
    it("negates exponents", () => {
      type Acceleration = { length: 1; time: -2 };
      const Acceleration: Acceleration = { length: 1, time: -2 };

      type Foo = { length: -1; time: 2 };
      const foo: Foo = Reciprocal(Acceleration);

      expect(foo).toEqual({ length: -1, time: 2 });
    });
  });

  describe("Squared", () => {
    it("doubles exponents", () => {
      type Length = { length: 1 };
      const Length: Length = { length: 1 };

      type Area = { length: 2 };
      const area: Area = Squared(Length);

      expect(area).toEqual({ length: 2 });
    });
  });

  describe("Cubed", () => {
    it("triples exponents", () => {
      type Length = { length: 1 };
      const Length: Length = { length: 1 };

      type Volume = { length: 3 };
      const volume: Volume = Cubed(Length);

      expect(volume).toEqual({ length: 3 });
    });
  });
});
