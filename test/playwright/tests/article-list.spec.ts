import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true,
});

test('Anonymous users see published articles, and administrators see all articles, in pages of 25 articles', async ({ page }) => {
  await page.goto('https://starterkit-drupal-ddev.ddev.site');
  // There are 26 published articles, but our page should only show the
  // latest 25, so article one should not be visible to anonymous users.
  // The latest article, article 27, is unpublished, so it should not be
  // visible to anonymous users either.
  await expect(page.locator('text=ArticleTwentySeven')).toBeNull();
  await expect(page.locator('text=ArticleTwentySix')).toBeVisible();
  await expect(page.locator('text=ArticleTwo')).toBeVisible();
  await expect(page.locator('text=ArticleOne')).toBeNull();
  // Log in as admin to see all articles.
  await page.click('text=Log in');
  await page.fill('#edit-name', 'admin');
  await page.fill('#edit-pass', 'admin-password');
  await page.click('text=Log in');
  await page.goto('https://starterkit-drupal-ddev.ddev.site');
  // Article 27 is unpublished, so it should now be visible to
  // administrators, but because we are only showing 25 articles per page,
  // article one should still not be visible, neither should article 2.
  await expect(page.locator('text=ArticleTwentySeven')).toBeVisible();
  await expect(page.locator('text=ArticleTwentySix')).toBeVisible();
  await expect(page.locator('text=ArticleTwo')).toBeNull();
  await expect(page.locator('text=ArticleOne')).toBeNull();
});
