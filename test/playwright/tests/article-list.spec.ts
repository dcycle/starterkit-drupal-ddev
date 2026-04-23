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

test('Admins users see 5 latest articles, whether they are published or not.', async ({ page }) => {
  await page.goto('https://starterkit-drupal-ddev.ddev.site/user/login');
  await page.fill('input[name="name"]', 'admin');
  console.log('Using the password from the environment variable ADMIN_PASSWORD: ' + process.env.ADMIN_PASSWORD);
  await page.fill('input[name="pass"]', process.env.ADMIN_PASSWORD!);
  await page.click('input.form-submit');
  await page.click('text=Home');
  // Article 7 is unpublished, so it should not be visible to anonymous
  // users.
  // In admin mode there might be several items with the text ArticleSeven,
  // for example, which Playwright does not like. So we'll target instead
  // the link to the article, which is unique.
  await expect(page.locator('h2 a[href="/node/7"]')).toBeVisible();
  await expect(page.locator('h2 a[href="/node/6"]')).toBeVisible();
});
