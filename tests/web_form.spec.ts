// @ts-check
import { test, expect } from '@playwright/test';

test('Test Web Form', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await expect(page).toHaveTitle(/Web form/);

  await page.getByRole('textbox', { name: 'Text input' }).fill('kachain.a');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('textbox', { name: 'Textarea' }).pressSequentially('PV Apartment 111 (Room 1522)', { delay: 100 });

  await expect(page.locator('input[name="my-disabled"]')).toBeDisabled();
  await expect(page.locator('input[name="my-disabled"]')).toHaveAttribute('disabled');

  await expect(page.locator('input[name="my-readonly"]')).toBeEnabled();
  await expect(page.locator('input[name="my-readonly"]')).not.toBeEditable();
  await expect(page.locator('input[name="my-readonly"]')).toHaveAttribute('readonly');

  await page.getByLabel('Dropdown (select) Open this').selectOption('2');
  await page.getByRole('combobox', { name: 'Dropdown (datalist)' }).fill('New York');
  await page.getByRole('button', { name: 'File input' }).setInputFiles('Home_Page.png');
  await page.getByRole('checkbox', { name: 'Checked checkbox' }).uncheck();
  await page.getByRole('checkbox', { name: 'Default checkbox' }).check();
  await page.getByText('Default radio').click();
  await page.getByRole('textbox', { name: 'Color picker' }).fill('#1ce10e');
  const dateInput = page.getByRole('textbox', { name: 'Date picker' });
  await dateInput.pressSequentially('05/14/2025', { delay: 100 });
  await expect(dateInput).toHaveValue('05/14/2025');
  await page.locator('body').click();
  await page.getByRole('slider', { name: 'Example range' }).fill('8');
  await page.screenshot({ path: 'Images/Web_form.png' });

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveTitle(/Web form - target page/);
  await page.screenshot({ path: 'Images/Target_page.png' });
});
