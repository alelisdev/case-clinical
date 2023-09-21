import { test, expect } from '@playwright/test';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}

const PAGETITLE = "Legal Case";
const PAGENAME = "legal-cases"

test('legal-case-case-account-single-character', async ({ page }) => {
 
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

  await page.getByRole('link', { name: 'Case Accounts' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill('a');   
  await page.getByLabel('Name *').press('Enter'); 

  const validationMessageCount = await page.getByText('This field should be less than 255 characters').count();

  await expect(validationMessageCount).toEqual(0);

});