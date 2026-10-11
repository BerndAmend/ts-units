import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*_test.ts"],
    experimental: {
      // Run benchmarks without Vite's module runner so module exports are not
      // wrapped in getters. Those getters add overhead that dominates the
      // measurement when a benchmarked function is called millions of times.
      // See https://vitest.dev/guide/benchmarking#module-runner-overhead
      viteModuleRunner: false,
    },
    benchmark: {
      include: ["test/**/*_bench.ts"],
    },
  },
});
