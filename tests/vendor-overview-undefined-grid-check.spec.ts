import { test, expect } from '@playwright/test';
import { random } from 'chroma-js';
import { randomInt } from 'crypto';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGENAME = "vendors"

test('vendor-overview-undefined-grid-check', async ({ page }) => {

  await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Fvendors`);
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
 
  const count = await page.getByText('undefined-grid').count();

  await expect(count).toEqual(0);

});