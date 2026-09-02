import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const alias = {
  "@": fileURLToPath(new URL("./src", import.meta.url)),
};

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      {
        resolve: { alias },
        test: {
          name: "lib",
          environment: "node",
          include: ["src/**/*.test.ts"],
          exclude: ["**/__fixtures__/**", "**/node_modules/**"],
        },
      },
      {
        plugins: [react()],
        resolve: { alias },
        test: {
          name: "components",
          environment: "jsdom",
          include: ["src/**/*.test.tsx"],
          exclude: ["**/__fixtures__/**", "**/node_modules/**"],
        },
      },
    ],
  },
});
