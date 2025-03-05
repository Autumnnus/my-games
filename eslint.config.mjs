import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ["next"],
    rules: {
      "prefer-const": [
        "error",
        { destructuring: "any", ignoreReadBeforeAssign: false },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "if", next: "*" },
        { blankLine: "always", prev: "*", next: "return" },
      ],
    },
  }),
];

export default eslintConfig;
