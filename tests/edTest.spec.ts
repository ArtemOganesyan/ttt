// Test
// another one

import { test, expect } from '@playwright/test';


test('Validate footer items hover effect', async ({ page }) => {
  await page.goto('https://nop-qa.portnov.com/');

 
  const footerSections = [
    '.footer .information li a',
    '.footer .customer-service li a',
    '.footer .my-account li a',
  ];

  for (const selector of footerSections) {
    const items = page.locator(selector);
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      await item.hover();
      await expect(item).toHaveCSS('color', 'rgb(74, 178, 241)');
    }
  }
});