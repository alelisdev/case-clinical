import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8081/queues/legal-cases');
  await page.goto('http://localhost:8081/sign-in?redirectURL=%2Fqueues%2Flegal-cases');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('admin@underwriting.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('pch-dot-dev!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('http://localhost:8081/queues/legal-cases');
  const rows = page.locator('ag-row-even.ag-row.ag-row-level-0');
  await expect(rows).not.toBeEmpty();
});
