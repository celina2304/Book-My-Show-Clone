import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    ignores: ["node_modules", "dist", "build", "logs"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "prettier/prettier": "error",
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
];
