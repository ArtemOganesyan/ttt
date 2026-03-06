import { test, expect } from '@playwright/test'
import USPSLookupZip from '../pages/usps_lookup_zip'

test('USPS zip plus', async ({ page }) => {
    await page.goto('https://tools.usps.com/zip-code-lookup.htm?byaddress');
    await page.getByRole('textbox', { name: '*Street Address' }).fill('11 Wall St');
    await page.getByRole('textbox', { name: 'City' }).fill('New York');
    await page.getByLabel('State', { exact: true }).selectOption('NY');
    await page.getByRole('button', { name: 'Find' }).click();
})

test('USPS zip plus oop', async ({ page }) => {
    const lookupZip = new USPSLookupZip(page);
    await lookupZip.goto();
    await lookupZip.fillRequiredFields('11 Wall St', 'New York', 'NY');
    await lookupZip.clickFind();
})