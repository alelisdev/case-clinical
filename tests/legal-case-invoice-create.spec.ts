import { test, expect } from '@playwright/test';
import { random } from 'chroma-js';
import { randomInt } from 'crypto';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGENAME = "legal-cases"

test('legal-case-invoice-create', async ({ page }) => {

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
  const random = randomInt(100) * randomInt(100);
  await expect(currentUrl).toMatch('details/overview')

  await page.getByRole('link', { name: 'Case Accounts' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.locator('formly-field').filter({ hasText: 'Invoice Detail Select' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Add New Invoice Detail' }).click();
  await page.locator('ng-component').filter({ hasText: 'Invoice *Select' }).locator('span').nth(1).click();
  await page.getByRole('button', { name: 'Add New Invoice' }).click();
  await page.locator('#formly_114_input_name_5').click();
  await page.locator('#formly_114_input_name_5').fill(`aaaaaa${random}`);
  await page.getByLabel('Invoice Number').click();
  await page.getByLabel('Invoice Number').fill('333333');
  await page.getByLabel('Amount', { exact: true }).click();
  await page.getByLabel('Amount', { exact: true }).fill('$ 222,222,2222');
  await page.getByLabel('Paid', { exact: true }).click();
  await page.getByLabel('Paid', { exact: true }).fill('$ 1,1111');
  await page.getByLabel('Due', { exact: true }).click();
  await page.getByLabel('Due', { exact: true }).fill('$ 333'); 
  await page.locator('ng-component').filter({ hasText: 'Billing Organization *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'CVS Health' }).click();
  await page.locator('ui-formly-json-form').filter({ hasText: 'Invoice Create' }).getByRole('button', { name: 'Save' }).click();
  
  const toastSelector = '.hot-toast-message'; 
  await page.waitForSelector(toastSelector);

  const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText);
  await expect(toastText).toEqual("Created Successfully!");
 
});