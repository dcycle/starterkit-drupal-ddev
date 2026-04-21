import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true,
});

test('Anonymous users see 5 latest published articles.', async ({ page }) => {
  await page.goto('https://starterkit-drupal-ddev.ddev.site');
  // Article 7 is unpublished, so it should not be visible to anonymous
  // users.
  await expect(page.locator('text=ArticleSeven')).toHaveCount(0);
  await expect(page.locator('text=ArticleSix')).toBeVisible();
  await expect(page.locator('text=ArticleTwo')).toBeVisible();
  // Only five articles per page, so article one should not be visible.
  await expect(page.locator('text=ArticleOne')).toHaveCount(0);
});
