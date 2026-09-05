import { defineConfig, devices } from "@playwright/test";

/**
 * Ship 6.5's end-to-end suite. Runs against a real dev server (not
 * `next build && next start`, to keep the feedback loop fast — the point
 * here is exercising real user journeys through a real browser, not a
 * production-parity smoke test, which `npm run build` already covers).
 *
 * `E2E_TEST_AUTH=1` enables `src/lib/auth/config.ts`'s test-only
 * credentials provider — the only way to exercise account-gated features
 * (notes, the review flag) without real Google/email credentials, which
 * this project has never had (see `docs/auth.md`). That flag, and the JWT
 * session strategy it implies, are never set outside this config.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  // A single worker against one dev-server instance: `next dev` compiles
  // each route on first visit (can take 20s+ under load), so four workers
  // hitting four different routes at once easily exceeds the default 30s
  // navigation timeout — not a defect in the app, just dev-mode's on-demand
  // compilation contending with itself. Serial workers plus the generous
  // timeouts below make that a non-issue.
  workers: 1,
  timeout: 60_000,
  // Default is 5s — too tight for this environment's CPU contention
  // (documented throughout QUESTIONS.md as an ongoing theme this session).
  expect: { timeout: 10_000 },
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3211",
    trace: "retain-on-failure",
    navigationTimeout: 45_000,
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npx next dev -p 3211",
    url: "http://localhost:3211",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      E2E_TEST_AUTH: "1",
      AUTH_SECRET: "e2e-test-only-secret-never-used-in-production",
      // The account system ships behind this flag for the initial public
      // launch (`src/lib/flags.ts`) — the e2e suite covers sign-in,
      // progress, and social flows, so it needs them reachable regardless
      // of the flag's default.
      NEXT_PUBLIC_FLAG_KONTOSUSTEEM: "true",
    },
  },
});
