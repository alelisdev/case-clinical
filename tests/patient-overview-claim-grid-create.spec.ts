import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';
import { delay } from 'lodash';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}

const PAGETITLE = "Patient";
const PAGENAME = "patients"

test('patient-overview-claim-grid-create', async ({ page }) => {

  const random = randomInt(100) * randomInt(100);
  await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Fpatients`);
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

  await page.locator('web-ui-grid').filter({ hasText: 'Claim+ Add Drag here to set row groupsDrag here to set column labels Prior Autho' }).getByRole('button', { name: '+ Add' }).click();
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill(`aaaaa${random}`);
  await page.locator('ng-select span').first().click();
  await page.getByRole('option', { name: 'aaa', exact: true }).click();
  await page.getByLabel('Referring Provider', { exact: true }).click();
  await page.getByLabel('Referring Provider', { exact: true }).fill('aaaa');
  await page.getByLabel('Provider Name').click();
  await page.getByLabel('Patient Name').click();
  await page.getByLabel('Patient Name').fill('aa');
  await page.getByLabel('Date of Birth').fill('2023-07-20');
  await page.getByLabel('Phone Number', { exact: true }).click();
  await page.getByLabel('Phone Number', { exact: true }).fill('(333) 333-33333');
  await page.getByPlaceholder('Search address').first().click();
  await page.getByPlaceholder('Search address').first().fill('dfd');
  await page.getByLabel('Insured Name').click();
  await page.getByLabel('Insured Name').fill('fd');
  await page.getByPlaceholder('Search address').nth(1).click();
  await page.getByLabel('Service Facility', { exact: true }).fill('fd');
  await page.getByPlaceholder('Search address').nth(1).fill('fdf');
  await page.getByLabel('Service Facility', { exact: true }).click();
  await page.getByPlaceholder('Search address').nth(1).click();
  await page.getByPlaceholder('Search address').nth(1).fill('fd');
  await page.getByRole('button', { name: 'Save' }).click();

  const toastSelector = '.hot-toast-message'; 
  await page.waitForSelector(toastSelector);

  const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText);
  await expect(toastText).toEqual("Created Successfully!");

});