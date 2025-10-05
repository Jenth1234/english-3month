module.exports = {
  root: true,
  ignorePatterns: ["next-env.d.ts", ".next/**/*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "@next/next", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@next/next/recommended"
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-no-target-blank": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "import/no-anonymous-default-export": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      typescript: {
        project: "./tsconfig.json"
      }
    }
  },
  env: {
    browser: true,
    node: true
  }
};
