import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    env: {
      node: true,
      es2021: true,
    },
  },
];
