import { test, expect } from '@playwright/test';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}

test('legal-case-grid-list-data-exist-test', async ({ page }) => {
  await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Flegal-cases`);
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(SETTINGS.USERNAME || 'admin@underwriting.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(SETTINGS.PASSWORD || 'pch-dot-dev!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForSelector('.ag-root-wrapper');
  const rowCount = await page.evaluate(() => {
    const gridBody = document.querySelector('.ag-center-cols-viewport');
    const rows = gridBody!.querySelectorAll('.ag-row');
    return rows.length;
  });
  console.log("row count:", rowCount)
  await expect(rowCount).toBeGreaterThan(0)
  
});