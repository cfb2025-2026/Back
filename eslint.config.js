// eslint.config.js
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["node_modules/"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        // 🌐 Globals navigateur (document, fetch, FormData, URL, HTML*Element, location, etc.)
        ...globals.browser,
        // 💻 Globals Node (process, __dirname, etc.)
        ...globals.node,
        // On force aussi Request/Response au cas où
        Request: "readonly",
        Response: "readonly",
      },
    },

    plugins: {
      "@typescript-eslint": ts,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...prettier.rules,

      // `any` = warning (tu peux le passer à "off" si ça t’agace)
      "@typescript-eslint/no-explicit-any": "warn",

      // éviter les unused vars sauf celles qui commencent par _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
