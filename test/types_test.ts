import { metersPerSecond, type Speed } from "../src/speed/mod.ts";
import { type Length, meters } from "../src/length/mod.ts";
import type { Time } from "../src/time/mod.ts";
import { kilograms, type Mass } from "../src/mass/mod.ts";
import { type Force, newtons } from "../src/force/mod.ts";
import type { Energy } from "../src/energy/mod.ts";
import { type Power, watts } from "../src/power/mod.ts";
import { type Frequency, hertz } from "../src/frequency/mod.ts";
import {
  becquerels,
  type Radioactivity,
} from "../src/radioactive/decay/mod.ts";
import {
  type AbsorbedDose,
  type EquivalentDose,
  grays,
  sieverts,
} from "../src/radioactive/dose/mod.ts";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("Type Safety", () => {
  it("should not allow assigning Speed to Length", () => {
    const speed: Speed = metersPerSecond(5);
    // @ts-expect-error Speed should not be assignable to Length
    const length: Length = speed;
    // prevent unused variable error
    expect(length).toBeDefined();
  });

  it("should not allow assigning Length to Speed", () => {
    const length: Length = meters(10);
    // @ts-expect-error Length should not be assignable to Speed
    const speed: Speed = length;
    expect(speed).toBeDefined();
  });

  it("should not allow assigning Length to Time", () => {
    const length: Length = meters(10);
    // @ts-expect-error Length should not be assignable to Time
    const time: Time = length;
    expect(time).toBeDefined();
  });

  it("should allow assigning compatible types", () => {
    const speed1: Speed = metersPerSecond(5);
    const speed2: Speed = speed1;
    expect(speed2).toBe(speed1);
  });

  it("should not allow assigning Mass to Length", () => {
    const mass: Mass = kilograms(10);
    // @ts-expect-error Mass should not be assignable to Length
    const length: Length = mass;
    expect(length).toBeDefined();
  });

  it("should not allow assigning Force to Energy", () => {
    const force: Force = newtons(10);
    // @ts-expect-error Force should not be assignable to Energy
    const energy: Energy = force;
    expect(energy).toBeDefined();
  });

  it("should not allow assigning Power to Speed", () => {
    const power: Power = watts(100);
    // @ts-expect-error Power should not be assignable to Speed
    const speed: Speed = power;
    expect(speed).toBeDefined();
  });

  describe("Fixed Issues: Overlapping Dimensions (Nominal Typing)", () => {
    it("should NOT allow mixing Frequency and Radioactive Decay (T^-1)", () => {
      const f: Frequency = hertz(100);
      const d: Radioactivity = becquerels(100);

      const setFrequency = (_: Frequency) => {};
      const setDecay = (_: Radioactivity) => {};

      // @ts-expect-error Frequency should not be assignable to Radioactivity
      setDecay(f);
      // @ts-expect-error Radioactivity should not be assignable to Frequency
      setFrequency(d);
    });

    it("should NOT allow mixing Absorbed Dose and Equivalent Dose (L^2 T^-2)", () => {
      const g: AbsorbedDose = grays(2);
      const s: EquivalentDose = sieverts(2);

      const useAbsorbed = (_: AbsorbedDose) => {};
      const useEquivalent = (_: EquivalentDose) => {};

      // @ts-expect-error EquivalentDose should not be assignable to AbsorbedDose
      useAbsorbed(s);

      // @ts-expect-error AbsorbedDose should not be assignable to EquivalentDose
      useEquivalent(g);
    });
  });
});
