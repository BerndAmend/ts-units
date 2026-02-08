import {
  type AbsorbedDose,
  becquerels,
  dimensions,
  type Energy,
  type EquivalentDose,
  type Force,
  type Frequency,
  grays,
  hertz,
  kilograms,
  type Length,
  type Mass,
  meters,
  metersPerSecond,
  newtons,
  type Power,
  type Radioactivity,
  sieverts,
  type Speed,
  type Time,
  watts,
} from "ts-units";
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

  describe("brand() compile-time safety", () => {
    it("should NOT allow branding with incompatible dimensions", () => {
      // @ts-expect-error Area (length: 2) is not compatible with Speed (length: 1, time: -1)
      const invalid = meters.squared().brand(dimensions.Speed);
      expect(invalid).toBeDefined();
    });

    it("should allow branding with compatible dimensions", () => {
      const valid = meters.squared().brand(dimensions.Area);
      expect(valid).toBeDefined();
    });
  });
});
