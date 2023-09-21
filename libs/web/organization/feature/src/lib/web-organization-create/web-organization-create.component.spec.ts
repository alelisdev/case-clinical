import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  let isDev = process.env.Development
  let host = process.env.WEB_BASE_URL
  let pagePath = '/queues/organizations'
  await page.goto(host + pagePath);


  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Case Clinical/);
});
