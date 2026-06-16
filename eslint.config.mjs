import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
    ".codex/**",
    ".agents/**",
    ".claude/**",
    ".claude-flow/**",
    ".vercel/**",
    ".pnpm-store/**",
    "CLAUDE.md",
    "skills-lock.json",
  ]),
  {
    settings: {
      react: { version: "19" },
    },
  },
]);

export default eslintConfig;
