import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGETITLE = "Medical Records";
const PAGENAME = "medical-records"

test('medical-records-create-validation-error-always-display', async ({ page }) => {
 
  const random1 = randomInt(100);
  const random2 = randomInt(200);
  await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Fmedical-records`);
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(SETTINGS.USERNAME || 'admin@underwriting.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(SETTINGS.PASSWORD || 'pch-dot-dev!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForSelector('.ag-root-wrapper');
  const navigationPromise = page.waitForNavigation();
  await page.getByRole('button', { name: 'Create' }).click();
  await navigationPromise;
  await page.waitForLoadState('networkidle');
  
  const currentUrl = await page.url();
  await expect(currentUrl).toEqual(`${SETTINGS.ENVIRONMENT_URL}/queues/${PAGENAME}/create`)

 
  await page.locator('formly-field').filter({ hasText: 'Clinical Provider *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Abdallah Farrukh' }).click();
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill(`aaaaa${random1}${random2}`);
  await page.locator('formly-field').filter({ hasText: 'Patient *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Adam' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

  const errorMessageCount = await page.getByText('This field is required').count();
  await expect(errorMessageCount).toEqual(0);

  const toastSelector = '.hot-toast-message'; 
  await page.waitForSelector(toastSelector);

  const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText);
  await expect(toastText).toEqual("Created Successfully!");

});