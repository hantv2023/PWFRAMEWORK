import { test } from '../core/page.fixtures';
import { expect } from '@playwright/test';
import { ReportUtils } from '../core/utils';
import { step } from '../allure-js-commons';

test('checkout submit successfully', async ({ page, loggedIn, HomePage, CartPage, CheckoutPage }) => {
    void loggedIn;

    await step('Step 1: Add a product to the cart', async () => {
        await HomePage.addProductToCart('Quần jeans');
    });

    await step('Step 2: Navigate to the cart', async () => {
        await HomePage.gotoCart();
        await expect(CartPage.checkoutbutton).toBeVisible();
    });

    await step('Step 3: Navigate to checkout', async () => {
        await CartPage.gotocheckoutPage();
        await expect(CheckoutPage.checkoutbutton).toBeVisible();
    });

    await step('Step 4: Fill receiver information and submit the order', async () => {
        await CheckoutPage.checkout('cash');
    });

    await step('Step 5: Verify the order succeeded', async () => {
        await ReportUtils.attachScreenshot('Checkout success', page, async () => {
            await expect(CheckoutPage.successMessage).toBeVisible();
        });
    });
});