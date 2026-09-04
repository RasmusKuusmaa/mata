import { expect, test } from "@playwright/test";
import { answerCurrentQuestion } from "./helpers";

test("mock exam: start, answer both parts, reach the review screen", async ({
  page,
}) => {
  await page.goto("/eksam");
  await page.getByRole("button", { name: "Alusta eksamit" }).click();

  // Osa I: 7 questions, "Järgmine" for the first 6, submit-part on the 7th.
  for (let i = 0; i < 6; i++) {
    await answerCurrentQuestion(page);
    await page.getByRole("button", { name: "Järgmine" }).click();
  }
  await answerCurrentQuestion(page);
  await page
    .getByRole("button", { name: "Esita I osa ja mine vaheajale" })
    .click();

  await expect(page.getByText("Vaheaeg", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Jätka kohe II ossa" }).click();

  // Osa II: 5 questions, "Järgmine" for the first 4, submit-exam on the 5th.
  for (let i = 0; i < 4; i++) {
    await answerCurrentQuestion(page);
    await page.getByRole("button", { name: "Järgmine" }).click();
  }
  await answerCurrentQuestion(page);
  await page.getByRole("button", { name: "Esita eksam" }).click();

  await expect(page.getByText("Eksami tulemus")).toBeVisible({
    timeout: 15_000,
  });
  // Scoped to the score display's own class, not a bare text regex — the
  // per-course breakdown table's adjacent "X / Y" cells concatenate in the
  // accessible text tree and can spuriously match a loose "\d+ / 100".
  await expect(page.locator("p.text-2xl.font-semibold")).toHaveText(
    /^\d+ \/ 100$/,
  );
  await expect(page.getByText("Tulemus kursuste kaupa")).toBeVisible();
});
