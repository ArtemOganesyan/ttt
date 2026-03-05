import { test, expect } from '@playwright/test';


// open usps.com
// validate the logo is visible
test( 'USPS page open', async ({ page }) => {
await page.goto('https://www.usps.com/');
await expect(page).toHaveTitle('Welcome | USPS');
await expect(page).toHaveTitle(/USPS/); // use contain (regular expretion) insted of exact match
await expect(page.getByRole('link', { name: 'Image of USPS.com logo.' })).toBeVisible();
// await page.pause();  - to pause the test to tun to continue witht the codegen
});



test('USPS language change', async ( {page}) =>{
await page.goto('https://www.usps.com/');
await page.locator('#link-lang').hover();
await page.getByRole('link', { name: 'Español' }).click();
await expect(page).toHaveURL(/es/);
await expect(page).toHaveURL('https://es.usps.com/');
await expect(page).toHaveTitle('Bienvenido | USPS');
await expect(page).toHaveTitle(/Bienvenido/);

        //helpers:
// await page.waitForTimeout(5000);
//await page.pause();

});



test ('USPS - Calculate a Price', async ({page}) => {
await page.goto('https://www.usps.com/');
await page.getByRole('menuitem', { name: 'Send' }).hover();
await page.locator('#g-navigation a').filter({ hasText: /^Calculate a Price$/ }).click();
await page.getByRole('button', { name: 'Postcard' }).click();
await page.getByRole('row', { name: /First-Class Mail® Postcards/ }).getByPlaceholder('Quantity').fill('1');
await page.getByRole('row', { name: 'First-Class Mail® Stamped' }).getByPlaceholder('Quantity').fill('1');
await page.waitForTimeout(100);  // need this delay for calculate button to work
await page.getByRole('button', { name: 'Calculate' }).click();
await expect(page.getByText('$1.39')).toBeVisible();
await expect(page.locator('#total')).toContainText('$1.39');
});