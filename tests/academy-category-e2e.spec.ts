
import {SETTINGS} from './setup';
import { test, expect } from '@playwright/test';

test.use({actionTimeout: 10000 })

test('take screenshot on large viewport of Academy Category list', async({ page }) => {
  test.setTimeout(60000)
  
  await page.setViewportSize({width: 1920, height: 1080 })

  const rootPromise = page.goto('/', {timeout: 20000, waitUntil: 'networkidle'});
  await rootPromise;

  const navigationPromise = page.goto('/queues/academy-categories', {timeout: 20000, waitUntil: 'networkidle'});
  await navigationPromise;
})

test('take screenshot on middle viewport of Academy Category list', async({ page }) => {
  test.setTimeout(60000)
  await page.setViewportSize({width: 1000, height: 800})

  const navigationPromise = page.waitForURL('/queues/academy-categories', {timeout: 20000, waitUntil: 'networkidle'});
  await navigationPromise;
})

test('take screenshot on small viewport of Academy Category list', async({ page }) => {
  test.setTimeout(60000)
  await page.setViewportSize({width: 600, height: 800})

  const navigationPromise = page.waitForURL('/queues/academy-categories', {timeout: 20000, waitUntil: 'networkidle'});
  await navigationPromise;

  await page.getByRole('gridcell').first().click();
  const overviewPromise = page.waitForURL(new RegExp('$details/overview'), {timeout: 20000, waitUntil: 'networkidle'});
  await overviewPromise;
})

test.afterEach(async ({page, browserName}, testInfo) => {
  await page.screenshot({
    path: `./test-results/${testInfo.title.replace('/ /g', '-')}-${browserName}.png`,
  })
})
