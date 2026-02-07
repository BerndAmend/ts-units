#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --allow-run
// deno-lint-ignore no-import-prefix no-unversioned-import
import { walk } from "jsr:@std/fs";
// deno-lint-ignore no-import-prefix no-unversioned-import
import { dirname, relative, toFileUrl } from "jsr:@std/path";

const SRC_DIR = new URL("../src", import.meta.url).pathname;
const OUT_FILE = new URL("../src/mod.ts", import.meta.url).pathname;

// deno-lint-ignore no-explicit-any
function isUnit(value: any): boolean {
  return (
    typeof value === "function" &&
    "symbol" in value &&
    "dimension" in value &&
    "scale" in value
  );
}

async function generate() {
  const unitFiles: { path: string; exports: string[]; units: string[] }[] = [];
  const exportCounts: Record<string, number> = {};

  console.log(`Scanning ${SRC_DIR} for unit definitions...`);

  for await (
    const entry of walk(SRC_DIR, { includeDirs: false, match: [/mod\.ts$/] })
  ) {
    if (
      entry.path.endsWith("/src/mod.ts")
    ) continue;

    const moduleUrl = toFileUrl(entry.path).href;
    try {
      const mod = await import(moduleUrl);
      const fileExports: string[] = [];
      const fileUnits: string[] = [];

      for (const [key, value] of Object.entries(mod)) {
        // Skip default exports or weird things if any
        if (key === "default") continue;
        // Skip factory functions
        if (key === "withValueType") continue;

        fileExports.push(key);

        if (isUnit(value)) {
          fileUnits.push(key);
        }

        exportCounts[key] = (exportCounts[key] || 0) + 1;
      }

      if (fileExports.length > 0) {
        unitFiles.push({
          path: entry.path,
          exports: fileExports,
          units: fileUnits,
        });
      }
    } catch (error) {
      console.warn(`Failed to import ${entry.path}:`, error);
    }
  }

  // Check for collisions
  const collisions = Object.entries(exportCounts).filter(([_, count]) =>
    count > 1
  ).map(([name]) => name);
  if (collisions.length > 0) {
    console.warn("Warning: Duplicate exports found:", collisions);
  }

  const lines: string[] = [];
  lines.push(`import type { Quantity, Unit } from "./unit.ts";`);
  lines.push(`import type { Dimensions } from "./dimension.ts";`);
  lines.push(`import { parse as parseBase } from "./parse.ts";`);
  lines.push("");

  // Generate exports
  for (const file of unitFiles) {
    const relPath = relative(dirname(OUT_FILE), file.path);
    const importPath = relPath.startsWith(".") ? relPath : `./${relPath}`;
    lines.push(`export { ${file.exports.join(", ")} } from "${importPath}";`);
  }

  lines.push("");
  lines.push("// Import all for the array");

  for (const [i, file] of unitFiles.entries()) {
    const relPath = relative(dirname(OUT_FILE), file.path);
    const importPath = relPath.startsWith(".") ? relPath : `./${relPath}`;
    lines.push(`import * as unit_ns_${i} from "${importPath}";`);
  }

  lines.push("");
  lines.push("/**");
  lines.push(" * An array of all units in the library.");
  lines.push(" */");
  lines.push("// deno-lint-ignore no-explicit-any");
  lines.push("export const allUnits: Unit<number, any>[] = [");

  for (const [i, file] of unitFiles.entries()) {
    const ns = `unit_ns_${i}`;
    // Only add verified units to the array
    file.units.forEach((exp) => {
      lines.push(`  ${ns}.${exp},`);
    });
  }

  lines.push("];");

  lines.push("");
  lines.push(
    "export function parse(input: string): Quantity<number, Dimensions> {",
  );
  lines.push("  return parseBase(input, allUnits);");
  lines.push("}");

  await Deno.writeTextFile(OUT_FILE, lines.join("\n"));
  console.log(`Generated ${OUT_FILE}`);

  const command = new Deno.Command("deno", {
    args: ["fmt", OUT_FILE],
  });
  await command.output();
  console.log(`Formatted ${OUT_FILE}`);
}

generate();
