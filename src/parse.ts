import type { Quantity, Unit } from "./unit.ts";
import type { Dimensions } from "./dimension.ts";

/**
 * Parses a string into a quantity.
 * @param input The string to parse.
 * @param units A list or object of allowed units.
 * @returns The parsed quantity.
 * @throws Error if the unit is unknown or the format is invalid.
 */
export function parse(
  input: string,
  units: Record<string, Unit<number, Dimensions>> | Unit<number, Dimensions>[],
): Quantity<number, Dimensions> {
  const match = input.trim().match(/^([\d.,\s]+)\s*(.*)$/);

  if (!match || !match[1] || !match[2]) {
    throw new Error(`Invalid format: "${input}"`);
  }

  const valueStr = match[1].replace(/,/g, "."); // Simple handling for decimal comma
  const symbol = match[2];
  const value = parseFloat(valueStr.replace(/\s/g, "")); // Remove spaces

  if (isNaN(value)) {
    throw new Error(`Invalid number: "${match[1]}"`);
  }

  const unitList = Array.isArray(units) ? units : Object.values(units);
  const unit = unitList.find((u) => u.symbol === symbol);

  if (!unit) {
    throw new Error(`Unknown unit: "${symbol}"`);
  }

  return unit(value);
}
