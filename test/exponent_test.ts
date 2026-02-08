import {
  type Add,
  type Double,
  isExponent,
  type Negate,
  type Subtract,
  type Triple,
} from "ts-units";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

const _a1: Add<2, 1> = 3;
const _a2: Add<2, -3> = -1;
const _a3: Add<2, undefined> = 2;
const _s1: Subtract<4, 1> = 3;
const _s2: Subtract<2, 3> = -1;
const _s3: Subtract<2, undefined> = 2;
const _s4: Subtract<3, 3> = undefined;
const _n1: Negate<-2> = 2;
const _n2: Negate<3> = -3;
const _n3: Negate<undefined> = undefined;
const _d1: Double<-2> = -4;
const _d2: Double<1> = 2;
const _d3: Double<undefined> = undefined;
const _t1: Triple<-1> = -3;
const _t2: Triple<1> = 3;
const _t3: Triple<undefined> = undefined;

describe("exponent", () => {
  describe("isExponent", () => {
    const tests = [
      { value: "foo", isExponent: false },
      { value: 1, isExponent: true },
      { value: -4, isExponent: true },
      { value: undefined, isExponent: true },
      { value: 0, isExponent: false },
      { value: 3.2, isExponent: false },
    ];
    tests.forEach((test) => {
      it(`isExponent(${test.value}) = ${test.isExponent}`, () => {
        expect(isExponent(test.value)).toEqual(test.isExponent);
      });
    });
  });
});
