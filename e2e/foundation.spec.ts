import { expect, test } from '@playwright/test';

test('renders Persian RTL application shell and navigates to settings', async ({ page }) => {
  await page.goto('/overview');
  await expect(page).toHaveTitle(/Platform Foundation/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('navigation', { name: 'ناوبری اصلی' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /یک پایه محکم برای/ })).toBeVisible();
  await page.getByRole('link', { name: /تنظیمات/ }).first().click();
  await expect(page.getByRole('heading', { name: 'تنظیمات محیط' })).toBeVisible();
});

test('switches dark theme and language without reloading', async ({ page }) => {
  await page.goto('/overview');
  await page.getByRole('button', { name: 'تغییر پوسته' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'تغییر زبان به انگلیسی' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { name: /A stronger foundation/ })).toBeVisible();
});

test('does not bypass login when opening protected monitoring', async ({ page }) => {
  await page.goto('/monitoring');
  await expect(page).toHaveURL(/\/auth\/sign-in$/);
  await expect(page.getByRole('heading', { name: 'اتصال احراز هویت' })).toBeVisible();
});

test('works with narrow mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/overview');
  await page.getByRole('button', { name: 'باز کردن منو' }).click();
  await expect(page.getByRole('navigation', { name: 'ناوبری اصلی' })).toBeVisible();
});
