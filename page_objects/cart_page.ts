import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { BASE_URL } from '../env/BASE_URL';

export class CartPage extends BasePage {
    itemInfo: Locator;
    checkoutbutton: Locator;
    cartItem: Locator;

    constructor(page: Page) {
        super(page);
        this.itemInfo = this.page.locator(".item-info");
        this.checkoutbutton = this.page.locator(".checkout-btn");
        this.cartItem = this.page.locator('.cart-item');
    }

    async navigateTo() {
        await this.goto(`${BASE_URL}/cart`);
    }

    getitemInfo(productName: string) {
        return this.itemInfo.filter({
            hasText: productName
        });
    }

    async isProductInCart(productName: string): Promise<boolean> {
        return await this.itemInfo
            .filter({ hasText: productName })
            .count() > 0;
    }

    getProductRow(productName: string): Locator {
        return this.cartItem
            .filter({
                has: this.itemInfo.filter({ hasText: productName })
            })
            .first();
    }

    getRemoveButton(productName: string): Locator {
        const productRow = this.getProductRow(productName);

        return productRow.locator('button[title="Xóa"]');
    }

    async removeProductfromCart(productName: string) {
        const removeButton = this.getRemoveButton(productName);

        await expect(removeButton).toBeVisible();
        await expect(removeButton).toBeEnabled();

        await removeButton.click();
    }

    async gotocheckoutPage() {
        await this.checkoutbutton.click();
    }
}