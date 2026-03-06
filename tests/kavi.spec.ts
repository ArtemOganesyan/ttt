//Kavi's Git test 
//Kavi made more changes to test git
//File changed by Kavi 

import { test, expect } from '@playwright/test';

const default_footer_color = 'rgb(119, 119, 119)';
const hover_footer_color = 'rgb(74, 178, 241)';

//Create a test to validate footer items hover effect (in a for loop for all items in 1 test).
test('Hover footer items test', async ({ page }) => {

    await page.goto('http://nop-qa.portnov.com', { waitUntil: 'networkidle'});

    const footerlinks = await page.locator('div.footer ul.list li a');

    await page.locator('div.footer').scrollIntoViewIfNeeded();
    const noOfFooterLinks = await footerlinks.count();
    console.log(noOfFooterLinks);
    for (let i = 0; i < noOfFooterLinks; i++) {
        
        const text = await footerlinks.nth(i);
        
        await expect(text).toHaveCSS('text-decoration-color', default_footer_color);
        await text.hover();
        await expect(text).toHaveCSS('text-decoration-color', hover_footer_color);

    }
});