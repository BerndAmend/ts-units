// @ts-check
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    extends: [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Dimension shapes rely on implicit index signatures, which interfaces do
      // not get, so `type` aliases are used throughout the library.
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      // Bindings that are intentionally unused are prefixed with an underscore.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // This stylistic rule directly conflicts with `no-non-null-assertion`,
      // which stays enabled, so we keep the safer of the two.
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      // Interpolating numbers is safe and pervasive in a units library.
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
    },
  },
  // Must come last: turns off rules that conflict with Prettier.
  eslintConfigPrettier,
);
