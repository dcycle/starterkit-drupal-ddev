import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true,
});

test('home page has "Log in"', async ({ page }) => {
  await page.goto('https://starterkit-drupal-ddev.ddev.site');
  await expect(page.locator('text=Log in')).toBeVisible();
});
