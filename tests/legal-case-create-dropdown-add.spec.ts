import { test, expect } from '@playwright/test';  
import { randomInt } from 'crypto';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}

const PAGENAME = "legal-cases"

test('legal-case-create-dropdown-add', async ({ page }) => { 

  const random = randomInt(100);

  await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Flegal-cases`);
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(SETTINGS.USERNAME || 'admin@underwriting.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(SETTINGS.PASSWORD || 'pch-dot-dev!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForSelector('.ag-root-wrapper');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.locator('formly-field').filter({ hasText: 'Accident Type *Select' }).locator('span').nth(1).click();
  await page.getByRole('button', { name: 'Add New Accident Type' }).click();  
  await page.locator('#formly_68_input_name_4').click();
  await page.locator('#formly_68_input_name_4').fill(`aaa${random}`);
  await page.locator('ui-accident-type-form').getByRole('button', { name: 'Save' }).click();
  const toastSelector = '.hot-toast-message'; 
  await page.waitForSelector(toastSelector);

  const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText);
  await expect(toastText).toEqual("Created Successfully!");

});