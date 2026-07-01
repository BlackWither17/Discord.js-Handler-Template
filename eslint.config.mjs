import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["warn", "double", { avoidEscape: true }],
      "comma-dangle": ["error", "always-multiline"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "indent": ["error", 2, {
        "SwitchCase": 1,
        "MemberExpression": 1,
        "FunctionDeclaration": { "parameters": "first" },
        "FunctionExpression": { "parameters": "first" },
        "CallExpression": { "arguments": "first" },
        "ArrayExpression": "first",
        "ObjectExpression": "first",
        "ImportDeclaration": "first",
        "flatTernaryExpressions": false,
        "ignoreComments": false,
      }],
      "no-unused-vars": ["error", { args: "after-used", ignoreRestSiblings: true }],
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "no-console": "warn",
    },
  },

  {
    // Standalone CLI scripts are expected to write to stdout.
    files: ["scripts/**/*.js"],
    rules: {
      "no-console": "off",
    },
  },

  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
    ignores: ["package-lock.json"],
  },
]);
