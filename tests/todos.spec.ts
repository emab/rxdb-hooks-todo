import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByLabel("Title").click();
  await page.getByLabel("Title").fill("My cool title");
  await page.getByLabel("Title").press("Tab");
  await page.getByLabel("Description").fill("My great description");
  await page.getByLabel("Description").press("Enter");

  await expect(page.locator("#root")).toContainText("My cool title");
  await expect(page.locator("#root")).toContainText("My great description");
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^My cool titleDone Delete$/ })
      .getByLabel("Done"),
  ).not.toBeChecked();

  await page
    .locator("div")
    .filter({ hasText: /^My cool titleDone Delete$/ })
    .getByLabel("Done")
    .check();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^My cool titleDone Delete$/ })
      .getByLabel("Done"),
  ).toBeChecked();

  await page
    .locator("div")
    .filter({ hasText: /^My cool titleDone Delete$/ })
    .getByRole("button")
    .click();
});
