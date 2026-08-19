import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { BASE_URL } from '../env/BASE_URL';

export class HomePage extends BasePage {
    profilelink: Locator;
    userNamelabel: Locator;
    productCard: Locator;
    productName: Locator;
    Cartbutton:Locator;
    Cartbadge: Locator;

    constructor(page: Page) {
        super(page);
        this.profilelink = this.page.locator("//a[@href='/profile']");
        this.userNamelabel = this.page.locator("//div//following::span[@data-testid='header-username']");
        this.productCard = this.page.locator(".product-card");
        this.productName = this.page.locator(".product-name");
        this.Cartbutton = this.page.locator(".cart-btn");
        this.Cartbadge = this.page.locator("//button//following::span[@class='cart-badge']");
    }

    async navigateTo() {
            await this.goto(`${BASE_URL}/home`);
    }

    async verifyUserName(expectedUserName: string) {
    await expect(this.userNamelabel).toContainText(expectedUserName);
    }

    async getCartBadgeCount(): Promise<number> {
    if (await this.Cartbadge.count() === 0) {
        return 0;
    }

    return Number(await this.Cartbadge.textContent());
    }
    

   getProductCard(productName: string) {
    return this.productCard.filter({
        has: this.productName.filter({ hasText: productName })
    });
    }
    async addProductToCart(productName: string) {
    const productCard = this.getProductCard(productName);

    await productCard.locator(".add-to-cart").click();
    }

    async gotoCart(){
        await this.Cartbutton.click();
    }

    async gotoProfile(){
        await this.profilelink.click();
    }
}