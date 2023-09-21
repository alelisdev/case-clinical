import { test, expect } from '@playwright/test';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGETITLE = "Clinical Provider";
const PAGENAME = "clinical-providers"

test('clinical-provider-create-email-validation', async ({ page }) => {
  
  await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Fclinical-providers`);
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
  await expect(currentUrl).toEqual(`${SETTINGS.ENVIRONMENT_URL}/queues/${PAGENAME}/create`); 

  await page.getByLabel('Email Address').click();
  await page.getByLabel('Email Address').fill('aaa');
  await page.getByLabel('Email Address').press('Enter');

  let validationMessageCount = await page.getByText('Please enter a valid email address').count();
  await expect(validationMessageCount).toEqual(1);
  
  await page.getByLabel('Email Address').click();
  await page.getByLabel('Email Address').fill('LuisChan@gamil.com');
  await page.getByLabel('Email Address').press('Enter');

  validationMessageCount = await page.getByText('Please enter a valid email address').count();
  await expect(validationMessageCount).toEqual(0);

});