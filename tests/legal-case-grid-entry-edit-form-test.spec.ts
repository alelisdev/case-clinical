import { test, expect } from '@playwright/test';

const SETTINGS = {
  IS_DEV: true,
  USERNAME:"admin@underwriting.dev",
  PASSWORD:"pch-dot-dev!",
  ENVIRONMENT_URL:"http://10.10.17.42:8081"
}
const PAGENAME = "legal-cases"
test('legal-case-grid-entry-edit-form', async ({ page }) => {
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
  await page.waitForLoadState('networkidle');

  const currentUrl = await page.url();
  await expect(currentUrl).toMatch(/details\/overview/)
  await page.waitForSelector('.ag-root-wrapper');
  
  const appointmentGridRowCount = await page.evaluate(() => {
    const appointmentGrid = document.querySelector("ui-appointment-select-table-view");
    if(!appointmentGrid) return -1
    const gridBody = appointmentGrid.querySelector('.ag-center-cols-viewport');
    const rows = gridBody!.querySelectorAll('.ag-row');
    
    return rows.length;
  });
  console.log("row count:", appointmentGridRowCount);
  await expect(appointmentGridRowCount).toBeGreaterThan(0)

  const gridSelector = 'ui-appointment-select-table-view'; 
  const gridElement = await page.waitForSelector(gridSelector);

  const firstCellSelector = '.ag-body-viewport .ag-row .ag-cell'; 
  const firstCellElement = await gridElement.waitForSelector(firstCellSelector);
  await firstCellElement.click();
  const modalWindow = await page.locator('.ngneat-dialog-backdrop');
  await navigationPromise;

  const modalWindowCount = await modalWindow.count();
  await expect(modalWindowCount).toEqual(1)
  
  await expect(await modalWindow.getByText("Appointment Edit")).toBeVisible();

});