import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
            {
              name: "@/lib/auth",
              message:
                "Use feature auth imports directly: @/features/auth/hooks/useAuth and @/features/auth/providers/AuthProvider.",
            },
            {
              name: "@/lib/rbac",
              message: "Import RBAC symbols from @/features/auth/lib/rbac or @/types/rbac.",
            },
            {
              name: "@/lib/mock-data",
              message: "Import mock data through query hooks/services, not from lib shims.",
            },
            {
              name: "@/components/layout/AppShell",
              message: "Import from @/app/layouts/AppShell.",
            },
            {
              name: "@/components/layout/Sidebar",
              message: "Import from @/app/layouts/Sidebar.",
            },
            {
              name: "@/components/layout/TopBar",
              message: "Import from @/app/layouts/TopBar.",
            },
            {
              name: "@/components/ui-kit/Primitives",
              message: "Use @/components/ui/Primitives directly.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/services/mock/db",
              message: "Import mock data via @/services/mock/queries hooks.",
            },
          ],
        },
      ],
    },
  },
  eslintPluginPrettier,
);
