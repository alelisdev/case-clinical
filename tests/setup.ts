// import { test as base } from '@playwright/test';
import { expect } from '@playwright/test';
import { matchers } from 'playwright-expect';

// add custom matchers
expect.extend(matchers);

export const SETTINGS = {
    IS_DEV: true,
    USERNAME:"admin@underwriting.dev",
    PASSWORD:"pch-dot-dev!",
    ENVIRONMENT_URL:"http://10.10.17.42:8081"
}

type Account = {
  username: string;
  password: string;
};

import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
    const { USERNAME, PASSWORD } = SETTINGS;
    await page.goto(`${SETTINGS.ENVIRONMENT_URL}/sign-in`);
    await page.getByLabel('Email address').click({ timeout: 15000 });
    await page.getByLabel('Email address').fill(USERNAME || "");
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(PASSWORD || "");
    await page.getByRole('button', {name: 'Sign in' }).click();

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
