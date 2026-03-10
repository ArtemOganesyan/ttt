import { test, expect } from '@playwright/test';

test.describe('USPS Website Tests', () => {

  test('Verify homepage loads', async ({ page }) => {
    await page.goto('https://www.usps.com/');
    await expect(page).toHaveTitle(/USPS/i);
    const logo = page.locator('.global-logo');
    await expect(logo).toBeVisible();
  });


  test('Track a package with invalid tracking number', async ({ page }) => {
    await page.goto('https://www.usps.com/');
    await page.fill('#home-input', '9205500000000000000000');
    await page.click('.quicktools-featured button[value="Search"]');
    await expect(page.locator('.container-fluid.full-subheader')).toContainText('USPS Tracking');
    await expect(page.locator('.tracking-label')).toContainText('Tracking Number');
    await expect(page.locator('.tracking-number')).toHaveText('9205500000000000000000');
    await expect(page.locator('h3.banner-header')).toHaveText('Tracking Not Available');
  });


});