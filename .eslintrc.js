module.exports = {
  react: {
    version: "detect",
    typescript: "4.4.2"
  },
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": [1, { args: "none" }],
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "no-unused-vars": 0,
    quotes: [2, "double"]
  }
};
