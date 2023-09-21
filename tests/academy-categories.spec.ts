import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/queues/academy-categories');
  await page.goto('http://localhost:4200/sign-in?redirectURL=%2Fqueues%2Facademy-categories');
  await page.getByLabel('Email address *').click();
  await page.getByLabel('Email address *').fill('admin@underwriting.dev');
  await page.getByLabel('Email address *').press('Tab');
  await page.getByLabel('Password *').fill('pch-dot-dev!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill('new category');
  await page.getByLabel('Slug').click();
  await page.getByLabel('Slug').fill('new slug');
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('new title');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL(/.*overview/);
});