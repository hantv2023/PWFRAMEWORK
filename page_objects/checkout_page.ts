import { Locator, Page } from '@playwright/test';
import receiverInfo from '../resources/receiverInfo.json';
import { BasePage } from './base.page';
import { BASE_URL } from '../env/BASE_URL';

export class CheckoutPage extends BasePage {
    recipientName: Locator
    recipientPhone: Locator;
    address: Locator;
    CODPaymentOption: Locator;
    checkoutbutton: Locator;
    checkoutheading: Locator;

    constructor(page: Page) {
        super(page);
        this.recipientName = this.page.locator("//input[@data-testid='checkout-name']");
        this.recipientPhone = this.page.locator("//input[@data-testid='checkout-phone']");
        this.address = this.page.locator("//input[@data-testid='checkout-address']");
        this.CODPaymentOption = this.getPaymentLocator('Thanh toán khi nhận hàng (COD)');
        this.checkoutbutton = this.page.locator("//button[@data-testid='checkout-submit']");
        this.checkoutheading = this.page.locator("")
    }

    async navigateTo() {
            await this.goto(`${BASE_URL}/checkout`);
    }

    getPaymentLocator(Payment: string) {
        return this.page.locator(`//input[@value='${Payment}']//..`)
    }

    async selectPaymentOption(Payment: string) {
        const PaymentLocator = this.getPaymentLocator(Payment);
        await PaymentLocator.click();
    }

    async checkout (Payment: string) {
        const info = receiverInfo.find(info => info.id === 1);

        if (!info) {
            throw new Error('Receiver info with id 1 not found');
        }
        await this.recipientName.fill(info.recipientName);
        await this.recipientPhone.fill(info.recipientPhone);
        await this.address.fill(info.address);
        await this.selectPaymentOption(Payment);
        await this.checkoutbutton.click();
    }
    get successMessage() {
        return this.page.getByText('Đặt hàng thành công');
    }
}