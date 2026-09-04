import { expect, test } from "@playwright/test";
import { answerCurrentQuestion } from "./helpers";

test("a full single-topic practice session, start to finish", async ({
  page,
}) => {
  await page.goto("/lai-matemaatika/teemad/01-arvuhulgad");
  await page.getByRole("link", { name: "Harjuta seda teemat" }).click();

  await expect(page.getByRole("progressbar")).toBeVisible();

  for (let i = 0; i < 10; i++) {
    await answerCurrentQuestion(page);
    await page.getByRole("button", { name: "Kontrolli" }).click();
    await expect(page.getByText("Lahenduskäik")).toBeVisible();
    await page.getByRole("button", { name: "Järgmine" }).click();
  }

  await expect(page.getByText("Harjutus lõpetatud!")).toBeVisible();
  await expect(page.getByText(/Tulemus: \d+ \/ 10/)).toBeVisible();
});
