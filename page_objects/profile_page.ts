import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { BASE_URL } from '../env/BASE_URL';

export class ProfilePage extends BasePage {
    fullname: Locator;
    submitbutton: Locator;

    constructor(page: Page) {
        super(page);
        this.fullname = this.page.locator("//input[@data-testid='profile-name']");
        this.submitbutton = this.page.locator("//button[@data-testid='profile-save']");
    }

    async navigateTo() {
        await this.goto(`${BASE_URL}/profile`);
    }

    async profilesave(text: string) {
        await this.fullname.fill(text);
        await this.submitbutton.click();
    }

    async verifyFullName(expectedUserName: string) {
        await expect(this.fullname).toHaveValue(expectedUserName);
    }

    get successMessage() {
        return this.page.getByText('Cập nhật thành công!');
    }

}
