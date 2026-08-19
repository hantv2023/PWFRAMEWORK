import { test } from '../core/page.fixtures';
import { expect } from '@playwright/test';
import { ReportUtils } from '../core/utils';
import { step } from '../allure-js-commons';

test.describe('Add a single product to cart', () => {
  test.beforeEach(async ({ loggedIn, HomePage }) => {
    void loggedIn;

    await step('Step 1: Verify the logged-in username', async () => {
      await HomePage.verifyUserName('ha');
    });
  });

  test.afterEach(async ({ CartPage }) => {
    await step('Step 6: Clean up the product from the cart', async () => {
      await CartPage.navigateTo();

      if (await CartPage.isProductInCart('Áo thun nam')) {
        await CartPage.removeProductfromCart('Áo thun nam');
      }
    });
  });

  test('adds a single product to cart', async ({ page, HomePage }) => {
    const beforeCount = await step('Step 2: Read the initial cart count', async () => {
      return HomePage.getCartBadgeCount();
    });

    await step('Step 3: Add the product to the cart', async () => {
      await HomePage.addProductToCart('Áo thun nam');
    });

    const afterCount = await step('Step 4: Read the updated cart count', async () => {
      return HomePage.getCartBadgeCount();
    });

    await step('Step 5: Verify the cart count increased by one', async () => {
      await ReportUtils.attachScreenshot('Cart count assertion', page, async () => {
        expect(afterCount).toBe(beforeCount + 1);
      });
    });
  });

});