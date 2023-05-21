module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    // Customize your rules here
    // e.g., 'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
