import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';
import * as moment from 'moment';
import { resolve } from 'path';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGETITLE = "Legal Case";
const PAGENAME = "legal-cases"
const getRandomPastDate = ()=> {
  const currentDate = new Date();
  const twoMonthsAgo = new Date(currentDate.getFullYear() - (currentDate.getDate() * randomInt(20)) % 50 + 30, currentDate.getMonth() - 2, Math.abs(currentDate.getDate() - currentDate.getMonth()));
  const timeDiff = currentDate.getTime() - twoMonthsAgo.getTime();
  const randomTime = Math.floor(Math.random() * timeDiff);
  const randomDate = new Date(twoMonthsAgo.getTime() + randomTime);
  return randomDate;
}
const padNumber=(num: number)=> {
  return num < 10 ? `0${num}` : num.toString();
}
const getFormattedDate = (date: Date)=> {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1); // Month is zero-based, so add 1
  const day = padNumber(date.getDate());
  return `${year}-${month}-${day}`;
}


test('legal-case-name-field-unique', async ({ page }) => {
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

  const pastRandomDate = getFormattedDate(getRandomPastDate());
  const newRandomDate = getFormattedDate(getRandomPastDate());

  await page.locator('formly-field').filter({ hasText: 'Accident Type *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'aaaaaaaaaa' }).click();
  await page.locator('formly-field').filter({ hasText: 'Patient *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Alda J. Zapata' }).click();
  await page.locator('formly-field').filter({ hasText: 'Med Level *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Gold' }).click();
  await page.locator('formly-field').filter({ hasText: 'Firm *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Actionable Attorneys' }).click();
  await page.locator('formly-field').filter({ hasText: 'Attorney *Select' }).locator('span').nth(1).click();
  await page.getByRole('listbox', { name: 'Options list' }).getByText('Actionable Attorneys').click();
  await page.locator('formly-field').filter({ hasText: 'Case Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Bolt12' }).click();
  await page.locator('formly-field').filter({ hasText: 'Case Type *Select' }).locator('span').nth(1).click();
  await page.getByText('Employment').click();
  await page.locator('formly-field').filter({ hasText: 'Patient Treatment Status *Select' }).locator('span').nth(1).click();
  await page.getByText('Prior Treatment').click();
  await page.locator('formly-field').filter({ hasText: 'Case Progress Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.locator('formly-field').filter({ hasText: 'Adverse Insurance Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Declined' }).click();
  await page.getByLabel('MRN *').click();
  await page.getByLabel('MRN *').fill('1231');
  await page.getByLabel('PCN *').click();
  await page.getByLabel('PCN *').fill('4325');
  await page.getByLabel('Group *').click();
  await page.getByLabel('Group *').fill('asdw');
  await page.getByLabel('Date of Loss').fill(pastRandomDate);
  await page.getByLabel('Case Status Date').fill(pastRandomDate);
  await page.getByLabel('Case Status Other').click();
  await page.getByLabel('Case Status Other').fill('qwe');
  await page.getByLabel('Paralegal', { exact: true }).click();
  await page.getByLabel('Paralegal', { exact: true }).fill('qwe');
  await page.getByLabel('Paralegal Contact').click();
  await page.getByLabel('Paralegal Contact').fill('qwe');
  await page.getByLabel('Case Note Summary').click();
  await page.getByLabel('Case Note Summary').fill('qwe');
  await page.getByLabel('Policy Limit').click();
  await page.getByLabel('Policy Limit').fill('$ 12');
  await page.getByLabel('Attorney Fee').click();
  await page.getByLabel('Attorney Fee').fill('$ 21');
  await page.getByLabel('Referring Physician').click();
  await page.getByLabel('Referring Physician').fill('qwe');
  await page.getByLabel('No More Treatment').check();
  await page.getByLabel('Medpay').check();
  await page.getByLabel('File Number').click();
  await page.getByLabel('File Number').fill('1231');
  await page.getByLabel('Case Number').click();
  await page.getByLabel('Case Number').fill('412431');
  await page.getByLabel('Accident State').click();
  await page.getByLabel('Accident State').fill('yes');
  await page.getByLabel('Assigned to').click();
  await page.getByLabel('Assigned to').fill('asd');
  await page.getByLabel('Attorney Paid').check();
  await page.getByLabel('Attorney Sent Date').fill(pastRandomDate);
  await page.getByLabel('Write off').check();
  await page.getByLabel('Hot').check();
  await page.getByLabel('In Active').check();
  await page.getByLabel('No MRI').check();
  await page.getByLabel('Documents Uploaded').check();
  await page.getByLabel('Criteria 1712').check();
  await page.getByLabel('No PT').check();
  await page.getByLabel('Attorney Review').check();
  await page.getByLabel('No First Appointment').check();
  await page.getByLabel('Escalated Review').check();
  await page.getByLabel('Document Uploaded Date').fill(pastRandomDate);
  await page.getByLabel('Patient Discharged Gathering Records Date').fill(pastRandomDate);
  await page.getByLabel('Resubmitted').fill(pastRandomDate);
  await page.getByLabel('Firm Case Manager').click();
  await page.getByLabel('Firm Case Manager').fill('asd');
  await page.getByLabel('Created by').click();
  await page.getByLabel('Created by').fill('admin');
  await page.getByLabel('Renegotiate Pay off Date').fill(pastRandomDate);
  await page.getByRole('button', { name: 'Save' }).click();
 
  const toastSelector = '.hot-toast-message'; 
  await page.waitForSelector(toastSelector);

  const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText);
  await expect(toastText).toEqual("Created Successfully!");

  await page.getByRole('button', { name: 'Back' }).click();  
  await page.getByRole('button', { name: 'Create' }).click();
  await navigationPromise;
  await page.waitForLoadState('networkidle');     // Create again!

  await page.locator('formly-field').filter({ hasText: 'Accident Type *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'aaaaaaaaaa' }).click();
  await page.locator('formly-field').filter({ hasText: 'Patient *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Alda J. Zapata' }).click();
  await page.locator('formly-field').filter({ hasText: 'Med Level *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Gold' }).click();
  await page.locator('formly-field').filter({ hasText: 'Firm *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Actionable Attorneys' }).click();
  await page.locator('formly-field').filter({ hasText: 'Attorney *Select' }).locator('span').nth(1).click();
  await page.getByRole('listbox', { name: 'Options list' }).getByText('Actionable Attorneys').click();
  await page.locator('formly-field').filter({ hasText: 'Case Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Bolt12' }).click();
  await page.locator('formly-field').filter({ hasText: 'Case Type *Select' }).locator('span').nth(1).click();
  await page.getByText('Employment').click();
  await page.locator('formly-field').filter({ hasText: 'Patient Treatment Status *Select' }).locator('span').nth(1).click();
  await page.getByText('Prior Treatment').click();
  await page.locator('formly-field').filter({ hasText: 'Case Progress Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.locator('formly-field').filter({ hasText: 'Adverse Insurance Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Declined' }).click();
  await page.getByLabel('MRN *').click();
  await page.getByLabel('MRN *').fill('1231');
  await page.getByLabel('PCN *').click();
  await page.getByLabel('PCN *').fill('4325');
  await page.getByLabel('Group *').click();
  await page.getByLabel('Group *').fill('asdw');
  await page.getByLabel('Date of Loss').fill(pastRandomDate);
  await page.getByLabel('Case Status Date').fill(pastRandomDate);
  await page.getByLabel('Case Status Other').click();
  await page.getByLabel('Case Status Other').fill('qwe');
  await page.getByLabel('Paralegal', { exact: true }).click();
  await page.getByLabel('Paralegal', { exact: true }).fill('qwe');
  await page.getByLabel('Paralegal Contact').click();
  await page.getByLabel('Paralegal Contact').fill('qwe');
  await page.getByLabel('Case Note Summary').click();
  await page.getByLabel('Case Note Summary').fill('qwe');
  await page.getByLabel('Policy Limit').click();
  await page.getByLabel('Policy Limit').fill('$ 12');
  await page.getByLabel('Attorney Fee').click();
  await page.getByLabel('Attorney Fee').fill('$ 21');
  await page.getByLabel('Referring Physician').click();
  await page.getByLabel('Referring Physician').fill('qwe');
  await page.getByLabel('No More Treatment').check();
  await page.getByLabel('Medpay').check();
  await page.getByLabel('File Number').click();
  await page.getByLabel('File Number').fill('1231');
  await page.getByLabel('Case Number').click();
  await page.getByLabel('Case Number').fill('412431');
  await page.getByLabel('Accident State').click();
  await page.getByLabel('Accident State').fill('yes');
  await page.getByLabel('Assigned to').click();
  await page.getByLabel('Assigned to').fill('asd');
  await page.getByLabel('Attorney Paid').check();
  await page.getByLabel('Attorney Sent Date').fill(pastRandomDate);
  await page.getByLabel('Write off').check();
  await page.getByLabel('Hot').check();
  await page.getByLabel('In Active').check();
  await page.getByLabel('No MRI').check();
  await page.getByLabel('Documents Uploaded').check();
  await page.getByLabel('Criteria 1712').check();
  await page.getByLabel('No PT').check();
  await page.getByLabel('Attorney Review').check();
  await page.getByLabel('No First Appointment').check();
  await page.getByLabel('Escalated Review').check();
  await page.getByLabel('Document Uploaded Date').fill(pastRandomDate);
  await page.getByLabel('Patient Discharged Gathering Records Date').fill(pastRandomDate);
  await page.getByLabel('Resubmitted').fill(pastRandomDate);
  await page.getByLabel('Firm Case Manager').click();
  await page.getByLabel('Firm Case Manager').fill('asd');
  await page.getByLabel('Created by').click();
  await page.getByLabel('Created by').fill('admin');
  await page.getByLabel('Renegotiate Pay off Date').fill(pastRandomDate);
  await page.getByRole('button', { name: 'Save' }).click();
 
  await page.waitForSelector(toastSelector);

  const toastText1 = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText1);
  await expect(toastText1).toEqual("Record must be unique.");


  await page.getByRole('button', { name: 'discard' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await navigationPromise;
  await page.waitForLoadState('networkidle');

  await page.locator('formly-field').filter({ hasText: 'Accident Type *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'aaaaaaaaaa' }).click();
  await page.locator('formly-field').filter({ hasText: 'Patient *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Alda J. Zapata' }).click();
  await page.locator('formly-field').filter({ hasText: 'Med Level *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Gold' }).click();
  await page.locator('formly-field').filter({ hasText: 'Firm *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Actionable Attorneys' }).click();
  await page.locator('formly-field').filter({ hasText: 'Attorney *Select' }).locator('span').nth(1).click();
  await page.getByRole('listbox', { name: 'Options list' }).getByText('Actionable Attorneys').click();
  await page.locator('formly-field').filter({ hasText: 'Case Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Bolt12' }).click();
  await page.locator('formly-field').filter({ hasText: 'Case Type *Select' }).locator('span').nth(1).click();
  await page.getByText('Employment').click();
  await page.locator('formly-field').filter({ hasText: 'Patient Treatment Status *Select' }).locator('span').nth(1).click();
  await page.getByText('Prior Treatment').click();
  await page.locator('formly-field').filter({ hasText: 'Case Progress Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.locator('formly-field').filter({ hasText: 'Adverse Insurance Status *Select' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Declined' }).click();
  await page.getByLabel('MRN *').click();
  await page.getByLabel('MRN *').fill('1231');
  await page.getByLabel('PCN *').click();
  await page.getByLabel('PCN *').fill('4325');
  await page.getByLabel('Group *').click();
  await page.getByLabel('Group *').fill('asdw');
  await page.getByLabel('Date of Loss').fill(newRandomDate);
  await page.getByLabel('Case Status Date').fill(pastRandomDate);
  await page.getByLabel('Case Status Other').click();
  await page.getByLabel('Case Status Other').fill('qwe');
  await page.getByLabel('Paralegal', { exact: true }).click();
  await page.getByLabel('Paralegal', { exact: true }).fill('qwe');
  await page.getByLabel('Paralegal Contact').click();
  await page.getByLabel('Paralegal Contact').fill('qwe');
  await page.getByLabel('Case Note Summary').click();
  await page.getByLabel('Case Note Summary').fill('qwe');
  await page.getByLabel('Policy Limit').click();
  await page.getByLabel('Policy Limit').fill('$ 12');
  await page.getByLabel('Attorney Fee').click();
  await page.getByLabel('Attorney Fee').fill('$ 21');
  await page.getByLabel('Referring Physician').click();
  await page.getByLabel('Referring Physician').fill('qwe');
  await page.getByLabel('No More Treatment').check();
  await page.getByLabel('Medpay').check();
  await page.getByLabel('File Number').click();
  await page.getByLabel('File Number').fill('1231');
  await page.getByLabel('Case Number').click();
  await page.getByLabel('Case Number').fill('412431');
  await page.getByLabel('Accident State').click();
  await page.getByLabel('Accident State').fill('yes');
  await page.getByLabel('Assigned to').click();
  await page.getByLabel('Assigned to').fill('asd');
  await page.getByLabel('Attorney Paid').check();
  await page.getByLabel('Attorney Sent Date').fill(pastRandomDate);
  await page.getByLabel('Write off').check();
  await page.getByLabel('Hot').check();
  await page.getByLabel('In Active').check();
  await page.getByLabel('No MRI').check();
  await page.getByLabel('Documents Uploaded').check();
  await page.getByLabel('Criteria 1712').check();
  await page.getByLabel('No PT').check();
  await page.getByLabel('Attorney Review').check();
  await page.getByLabel('No First Appointment').check();
  await page.getByLabel('Escalated Review').check();
  await page.getByLabel('Document Uploaded Date').fill(pastRandomDate);
  await page.getByLabel('Patient Discharged Gathering Records Date').fill(pastRandomDate);
  await page.getByLabel('Resubmitted').fill(pastRandomDate);
  await page.getByLabel('Firm Case Manager').click();
  await page.getByLabel('Firm Case Manager').fill('asd');
  await page.getByLabel('Created by').click();
  await page.getByLabel('Created by').fill('admin');
  await page.getByLabel('Renegotiate Pay off Date').fill(pastRandomDate);
  await page.getByRole('button', { name: 'Save' }).click();
  
  await page.waitForSelector(toastSelector);

  const toastText2 = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
  console.log('Toast notification:', toastText2);
  await expect(toastText).toEqual("Created Successfully!");

  await page.getByRole('button', { name: 'Back' }).click();

  for(let i = 0; i < 2; i++) {
    await page.getByRole('textbox', { name: 'Accident Type Filter Input' }).click();
    await page.getByRole('textbox', { name: 'Accident Type Filter Input' }).fill('aaaaaaaaa');
    await page.getByRole('textbox', { name: 'Accident Type Filter Input' }).press('Enter');
    const firstRow = await page.locator('.ag-body-viewport .ag-row').filter({ hasText: 'aaaaaaaaaa'}); 
    await firstRow.locator('.ag-cell').nth(1).click(); 
      
    if(!i) page.on('dialog', async (dialog) => {
      if (dialog.message() === 'Are you sure?') {
        await dialog.accept();
      } else {
      }
    });
    await page.getByRole('button', { name: 'Delete' }).click();
    const toastSelector = '.hot-toast-message'; 
    await page.waitForSelector(toastSelector);

    const toastText = await page.$eval(toastSelector, (toast) => (toast.textContent??"").trim());
    console.log('Toast notification:', toastText);
    await expect(toastText).toEqual("Deleted successfully!");
  }

});
