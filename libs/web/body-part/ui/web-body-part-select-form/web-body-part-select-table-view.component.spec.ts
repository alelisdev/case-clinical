import { test, expect, Page } from '@playwright/test';

test('WebBodyPartSelectTableViewComponent', async ({ page }) => {
  // Test setup
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:4200');

  // Test execution
  await page.waitForSelector('ui-body-part-select-table-view');
  const tableView = await page.$('ui-body-part-select-table-view');

  // Assertions - Check the initial state of the component
  const autoHeight = await tableView.getAttribute('autoHeight');
  expect(autoHeight).toBe('false');

  const bodyParts = await tableView.getAttribute('bodyParts');
  expect(bodyParts).toBeDefined();

  const columnDefs = await tableView.getAttribute('columnDefs');
  expect(columnDefs).toBeDefined();

  // Simulate row selection
  const options = {
    predicate: (page: Page) => {
        console.log(page)
        return true
    } ,
    timeout: 1000
}
  const rowItemsSelectedPromise = page.waitForEvent('worker', options);
  await page.click('table-view >>> .ag-row');
  const rowItemsSelected = await rowItemsSelectedPromise;
  expect(rowItemsSelected).toBeDefined();

  // Cleanup
  await page.close();
});