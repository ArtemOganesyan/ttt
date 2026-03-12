import { test, expect } from '@playwright/test';

test.describe('USPS Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.usps.com/');
  });

  test('Verify homepage loads', async ({ page }) => {
    await expect(page).toHaveTitle(/USPS/i);
    const logo = page.locator('.global-logo');
    await expect(logo).toBeVisible();
  });


  test('Verify carousel switches slides and displays correct headers', async ({ page }) => {

    const expectedHeaders = [
      'USPS Stamps',
      'Flat Rate Boxes',
      'Lowrider Philatelics',
      'USPS Plushes'
    ];

    const carousel = page.locator('div#usps-carousel.carousel.slide');
    await expect(carousel).toBeVisible();

    const slideHeaders = carousel.locator('.carousel-caption h2.header-2');
    await expect(slideHeaders).toHaveCount(4);

    for (let i = 0; i < expectedHeaders.length; i++) {
      await expect(slideHeaders.nth(i)).toContainText(expectedHeaders[i]);
    }

    const activeSlide = carousel.locator('.carousel-item.active .header-2');
    const firstHeader = await activeSlide.innerText();
    await carousel.locator('a.carousel-control-next').click();
    await expect(activeSlide).not.toHaveText(firstHeader);
  });

});