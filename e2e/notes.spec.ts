import { expect, test } from "@playwright/test";
import { signInAsTestUser } from "./helpers";

test("a topic note autosaves and survives a reload", async ({ page }) => {
  const email = `e2e-notes-${Date.now()}@test.local`;
  await signInAsTestUser(page, email);

  await page.goto("/lai-matemaatika/teemad/01-arvuhulgad");

  const noteText = `e2e test note ${Date.now()}`;
  const textarea = page.getByPlaceholder(/Kirjuta siia oma märkmed/);
  await textarea.fill(noteText);

  await expect(page.getByText("Salvestatud")).toBeVisible({ timeout: 5_000 });

  await page.reload();
  await expect(page.getByPlaceholder(/Kirjuta siia oma märkmed/)).toHaveValue(
    noteText,
  );
});
