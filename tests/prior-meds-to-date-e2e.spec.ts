
import {test,expect} from '@playwright/test';
import {SETTINGS} from './setup';

test.use({actionTimeout: 10000 })
const DIMENSIONS = [
  {width: 1920, height: 1080, name: 'large' },
  {width: 1000, height: 800, name: 'middle' },
  {width: 600, height: 800, name: 'small' },
]
for (const {name,width, height } of DIMENSIONS) {

    test('take screenshot on ' + name + ' viewport of Prior Meds to Date list', async({ page }) => {
        test.setTimeout(60000)
        await page.setViewportSize({
            height,
            width,
        })
        await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in?redirectURL=%2Fqueues%2Fprior-meds-to-dates`);
        await page.getByLabel('Email address *').click({ timeout: 15000 });
        await page.getByLabel('Email address *').fill(SETTINGS.USERNAME || "");
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill(SETTINGS.PASSWORD || "");
        const navigationPromise = page.waitForNavigation();

        await page.getByRole('button', {name: 'Sign in' }).click();

        await navigationPromise;

        await page.waitForLoadState('networkidle');

        await page.screenshot({
          path: `./test-results/prior-meds-to-dates-list-${name}.png`,
        })
    })
}
