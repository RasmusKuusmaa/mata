import type { Page } from "@playwright/test";

/** Signs in via the e2e-only credentials provider (see
 * `src/lib/auth/config.ts`'s `e2eAuthEnabled`, only active under
 * `playwright.config.ts`'s `webServer.env`). Creates the account on first
 * use, same as any other new sign-in. */
export async function signInAsTestUser(page: Page, email: string): Promise<void> {
  await page.goto("/sisene");
  await page.getByTestId("e2e-sisene-epost").fill(email);
  await page.getByTestId("e2e-sisene-nupp").click();
  await page.waitForURL("/");
}

/**
 * Fills in whichever answer widget `VastuseSisend` is currently showing —
 * a free-text input (`arv`/`tapne`/`hulk`) or a `valik` multiple-choice
 * button list — without caring which. These journeys exercise the flow
 * end-to-end (question shown → answered → graded → advance), not any
 * specific generator's correct answer, so any non-empty value is enough.
 */
export async function answerCurrentQuestion(page: Page): Promise<void> {
  const valikButtons = page.locator("div.flex.flex-col.gap-2 > button").first();
  const textInput = page.locator('input[type="text"]').first();

  // `isVisible()` reports the current state instantly rather than waiting
  // for one to appear, so a question still rendering (React transition,
  // client navigation) can race this check — wait for whichever widget
  // shows up first instead of guessing from an instant snapshot.
  await Promise.race([
    valikButtons.waitFor({ state: "visible" }),
    textInput.waitFor({ state: "visible" }),
  ]);

  if (await valikButtons.isVisible()) {
    await valikButtons.click();
    return;
  }
  await textInput.fill("1");
}
