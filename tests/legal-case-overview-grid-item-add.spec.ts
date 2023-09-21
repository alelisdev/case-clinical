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

test('legal-case-overview-grid-item-add', async ({ page }) => {

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
  const hour = randomInt(24);
  const minute = randomInt(60);
  console.log(hour);
  await expect(currentUrl).toMatch('details/overview')

  await page.locator('web-ui-grid').filter({ hasText: 'Appointment+ Add Drag here to set row groupsDrag here to set column labels Locat' }).getByRole('button', { name: '+ Add' }).click();
 await page.locator('ng-component').filter({ hasText: 'Clinical Provider *Select' }).getByRole('textbox').click();
 await page.getByRole('option', { name: 'Abdallah Farrukh' }).click();
 await page.locator('ng-component').filter({ hasText: 'Patient *Select' }).locator('span').nth(1).click();
 await page.getByText('Arreguin, Gabriela').click();
 await page.locator('ng-component').filter({ hasText: 'Appointment Status *Select' }).locator('span').nth(1).click();
 await page.getByRole('option', { name: 'Checked In' }).click();
 await page.getByLabel('Start *').click();
 await page.getByLabel('Start *').fill(`${hour}:${minute}`);
 await page.getByLabel('Duration(min) *').click();
 await page.getByLabel('Duration(min) *').fill('33');
 await page.getByLabel('Checked in', { exact: true }).check();
 await page.getByLabel('Notes').click();
 await page.getByLabel('Notes').fill('Testing');
 await page.getByLabel('Description').click();
 await page.getByLabel('Description').fill('Testing'); 
 await page.locator('ng-component').filter({ hasText: 'Location *Select' }).locator('span').nth(1).click();
 await page.getByRole('listbox', { name: 'Options list' }).getByText('14401 Phillips Circle, LA').click();
  await page.getByRole('button', { name: 'Save' }).click();

  const toastSelector = '.hot-toast-message'; 
  await page.waitForSelector(toastSelector);

  const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText);
  await expect(toastText).toEqual("Created Successfully!");
 
});