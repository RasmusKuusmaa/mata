import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import i18next from "eslint-plugin-i18next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintConfigPrettier,
  {
    // A leading underscore marks a parameter or binding as intentionally
    // unused (e.g. a trivial stub implementation awaiting a later ship).
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // No user-visible text may be hardcoded here — it belongs in
    // src/lib/i18n/et.ts and is pulled in through t().
    files: [
      "src/app/**/*.{ts,tsx}",
      "src/components/**/*.{ts,tsx}",
      "!src/**/*.test.{ts,tsx}",
    ],
    plugins: { i18next },
    rules: {
      "i18next/no-literal-string": [
        "error",
        {
          markupOnly: true,
          ignoreAttribute: [
            "className",
            "class",
            "id",
            "key",
            "href",
            "src",
            "rel",
            "target",
            "type",
            "name",
            "data-testid",
            "aria-current",
            "variable",
            "subsets",
            "weight",
          ],
        },
      ],
    },
  },
  {
    // `.claude/**` covers any nested git worktree Claude Code creates for a
    // parallel agent (e.g. `.claude/worktrees/<id>/`) — its own `.next/**`
    // build output isn't excluded by the bare `.next/**` pattern below,
    // since that only matches at this config's own root, not nested copies
    // several directories down. Caught when a full `npm run check` reported
    // thousands of errors from a sibling worktree's generated files.
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", ".claude/**"],
  },
];

export default eslintConfig;
