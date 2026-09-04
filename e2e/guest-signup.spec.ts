import { expect, test } from "@playwright/test";
import { answerCurrentQuestion, signInAsTestUser } from "./helpers";

test("a guest's practice attempt survives signing up", async ({ page }) => {
  // Practise one question as a guest — no account yet, just the signed
  // anonymous cookie every request gets (Ship 1.7).
  await page.goto("/lai-matemaatika/teemad/01-arvuhulgad");
  await page.getByRole("link", { name: "Harjuta seda teemat" }).click();
  // A generous timeout here specifically: this test runs right after the
  // exam spec's 12-question parallel grading burst, and has been observed
  // needing longer than the suite's default under this sandbox's CPU
  // contention even though the same navigation is instant in isolation.
  await expect(page.getByRole("progressbar")).toBeVisible({ timeout: 30_000 });
  await answerCurrentQuestion(page);
  await page.getByRole("button", { name: "Kontrolli" }).click();
  await expect(page.getByText("Lahenduskäik")).toBeVisible();

  // Sign up, in the same browser context so the guest cookie carries over —
  // Ship 3.4's guest merge (wired into the sign-in event) should attach that
  // attempt to the new account.
  const email = `e2e-guest-signup-${Date.now()}@test.local`;
  await signInAsTestUser(page, email);

  // The statistics page's "Sul pole veel harjutuste ajalugu" empty state
  // only renders when this user has zero attempts — seeing the actual
  // numbers tile instead proves the guest's attempt really did carry over.
  await page.goto("/statistika");
  await expect(page.getByText("Küsimusi kokku")).toBeVisible();
});
