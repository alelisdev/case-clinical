import { test, expect } from '@playwright/test';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGENAME = "legal-cases"

test('legal-case-grid-form-field-reopen', async ({ page }) => { 

  await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Flegal-cases`);
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(SETTINGS.USERNAME || 'admin@underwriting.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(SETTINGS.PASSWORD || 'pch-dot-dev!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForSelector('.ag-root-wrapper');
  const firstRow = await page.locator('.ag-body-viewport .ag-row');
  const navigationPromise = page.waitForNavigation();
  await firstRow.locator('.ag-cell').nth(1).click();
  await navigationPromise;

  const currentUrl = await page.url();
  await expect(currentUrl).toMatch('details/overview')

  const firstGrid = await page.locator('.ag-body-viewport .ag-layout-auto-height');   

  await firstRow.locator('.ag-cell').nth(1).click();
  await navigationPromise;

  await page.locator('.ngneat-close-dialog').click();

  await firstRow.locator('.ag-cell').nth(1).click();
  await navigationPromise;

  await expect(await page.getByText('Appointment Edit')).toBeVisible();

});