import { test, expect } from '@playwright/test';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGENAME = "legal-cases"
test('legal-case-entry-delete', async ({ page }) => {
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

  page.on('dialog', async (dialog) => {
    if (dialog.message() === 'Are you sure?') {
      // Accept the alert (click the "Yes" button)
      await dialog.accept();
    } else {
    }
  });
  await page.getByRole('button', { name: 'Delete' }).click();
  const toastSelector = '.hot-toast-message'; // Replace with the selector or class of your toast notification
  await page.waitForSelector(toastSelector);

  const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText);
  await expect(toastText).toEqual("Deleted successfully!");
  
});