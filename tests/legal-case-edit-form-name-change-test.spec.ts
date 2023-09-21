import { test, expect } from '@playwright/test';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGENAME = "legal-cases"
test('legal-case-edit-form-name-change', async ({ page }) => {
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
  await expect(currentUrl).toMatch(/details\/overview/)

  
  await page.getByRole('button', { name: 'Edit' }).click();
  const sleepDuration = 2000; 
  await page.waitForTimeout(sleepDuration);
  const labelSelector = 'label:has-text("Name *")'; 
  const labelElement = await page.waitForSelector(labelSelector);

  const inputSelector = `input[id="${await labelElement.getAttribute('for')}"]`;
  const inputElement = await page.waitForSelector(inputSelector);
  await page.evaluate((element) => {
    element.removeAttribute('readonly');
  }, inputElement);
  const changedName = await inputElement.inputValue()+'_test';
  await inputElement.fill(changedName);
  await page.getByRole('button', { name: 'Save' }).click();
  const toastSelector = '.hot-toast-message'; 
  await page.waitForSelector(toastSelector);

  const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText);
  await expect(toastText).toEqual("Updated Successfully!");
  
});