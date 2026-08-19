import { test } from '../core/page.fixtures';
import { ReportUtils } from '../core/utils';
import { step } from '../allure-js-commons';

test('verify login page shows blank required fields', async ({ page, LoginPage }) => {
  await step('Navigate to the login page', async () => {
    await LoginPage.navigateTo();
  });

  await step('Verify blank fields validation', async () => {
    await ReportUtils.attachScreenshot('Blank login fields validation', page, async () => {
      await LoginPage.verifyBlankFields();
    });
  });
});