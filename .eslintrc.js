module.exports = {
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
    ecmaFeatures: ["jsx"]
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:react/recommended"
      ],
      plugins: ["@typescript-eslint", "react", "react-hooks"],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "react/display-name": 0,
        "react/prop-types": 0,
        "no-console": "error"
      }
    }
  ]
};
