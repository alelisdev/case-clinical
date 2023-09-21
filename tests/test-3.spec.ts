import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8081/queues/legal-cases');
  await page.goto('http://localhost:8081/sign-in?redirectURL=%2Fqueues%2Flegal-cases');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('admin@underwriting.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('pch-dot-dev!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  const countElement = await page.locator('#ag-54-row-count');
  const count = Number(countElement.innerHTML);
  await expect(count).toBeGreaterThan(0);
});
