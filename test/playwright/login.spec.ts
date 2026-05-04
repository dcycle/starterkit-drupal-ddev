import { test, expect } from '@playwright/test';

test('home page has "Log in"', async ({ page }) => {
  await page.goto('http://web');
  await expect(page.locator('text=Log in')).toBeVisible();
});
