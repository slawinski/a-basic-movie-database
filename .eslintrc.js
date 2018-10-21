module.exports = {
  extends: ["airbnb-base", "prettier"],

  env: {
    browser: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["prettier"],
  rules: {
    "sort-imports": "off",
    "no-unused-vars": "off",
    "prettier/prettier": ["error"]
  }
};
