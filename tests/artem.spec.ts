import { test, expect } from '@playwright/test'
import { RegistrationEntity } from '../db/RegistrationEntity';
import { DatabaseConnection } from '../db/DatabaseConnection';

test.afterAll(async () => {
  await DatabaseConnection.close();
});

test('USPS zip plus', async ({ page }) => {
    await page.goto('https://tools.usps.com/zip-code-lookup.htm?byaddress');
    await page.getByRole('textbox', { name: '*Street Address' }).fill('11 Wall St');
    await page.getByRole('textbox', { name: 'City' }).fill('New York');
    await page.getByLabel('State', { exact: true }).selectOption('NY');
    await page.getByRole('button', { name: 'Find' }).click();
});

test('Registration', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI');
  
  const data = await RegistrationEntity.getById(2);
  if (!data) throw new Error('No registration data found in database for id 1');

  const randomString = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now();
  const [localPart, domain] = data.email.split('@');
  const uniqueEmail = `${localPart}+${randomString}${timestamp}@${domain}`;

  await page.goto('https://nop-qa.portnov.com/register');
  await page.getByRole('radio', { name: data.gender, exact: true }).check();
  await page.getByRole('textbox', { name: 'First name:' }).click();
  await page.getByRole('textbox', { name: 'First name:' }).fill(data.first_name);
  await page.getByRole('textbox', { name: 'First name:' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name:' }).fill(data.last_name);
  await page.getByRole('textbox', { name: 'Last name:' }).press('Tab');
  await page.locator('select[name="DateOfBirthDay"]').selectOption(data.day_of_birth);
  await page.locator('select[name="DateOfBirthMonth"]').selectOption(data.month_of_birth);
  await page.locator('select[name="DateOfBirthYear"]').selectOption(data.year_of_birth);
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill(uniqueEmail);
  await page.getByRole('textbox', { name: 'Company name:' }).click();
  await page.getByRole('textbox', { name: 'Company name:' }).fill(data.company);

  if (!data.newsletter) {
    await page.getByRole('checkbox', { name: 'Newsletter:' }).uncheck();
  }

  await page.getByRole('textbox', { name: 'Password:', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password:', exact: true }).fill(data.password);
  await page.getByRole('textbox', { name: 'Password:', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Confirm password:' }).fill(data.password);
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('body')).toContainText('Your registration completed');
  await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to our store' })).toBeVisible();
});