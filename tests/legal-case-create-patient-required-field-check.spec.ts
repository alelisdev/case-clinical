import { test, expect } from '@playwright/test';
import * as moment from 'moment';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGETITLE = "Legal Case";
const PAGENAME = "legal-cases"

test('legal-case-create-patient-required-field-check', async ({ page }) => {
  await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Flegal-cases`);
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

  console.log(`Current URL: ${currentUrl}`);

  await page.locator('formly-field').filter({ hasText: 'Patient *Select' }).locator('span').nth(1).click();
  await page.getByRole('button', { name: 'Add New Patient' }).click();

  const count = await page.getByText('Work Latitude *').count() + await page.getByText('Work Longitude *').count();

  await expect(count).toEqual(0);

});