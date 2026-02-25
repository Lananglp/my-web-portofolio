import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // 1. Konfigurasi Global Ignores (Folder yang tidak perlu di-scan)
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**", // Tambahan standar
  ]),

  // 2. Custom Rules (Tempat menaruh aturan "off" Anda)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off", // Opsional: sering berguna di Next.js
    },
  },
]);

export default eslintConfig;