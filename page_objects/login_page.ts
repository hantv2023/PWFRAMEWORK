import { expect, Locator, Page } from '@playwright/test';
import accounts from '../resources/accounts.json';
import { BasePage } from './base.page';
import { BASE_URL } from '../env/BASE_URL';

export class LoginPage extends BasePage {
    userName: Locator;
    password: Locator;
    loginButton: Locator;
    errormessage: Locator;

    constructor(page: Page){
       super(page);
       this.userName = this.page.locator("#username");
       this.password = this.page.locator("#password");
       this.loginButton = this.page.locator("//button[@data-testid='login-submit']");
       this.errormessage = this.page.locator("//div[@class='error-message']") 
      }

    async navigateTo() {
      await this.goto(`${BASE_URL}/login`);
    }

    async verifyBlankFields() {
      await expect(this.userName).toHaveValue('');
      await expect(this.password).toHaveValue('');
      await this.loginButton.click();
      await expect(this.errormessage).toBeVisible();
      await expect(this.errormessage).toContainText('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
    }

async login(role: string, id: string) {
    const account = accounts.find(account => account.role === role && account.id === id);

    if (!account) {
        throw new Error('Account not found: role=${role}, id=${id}`');
    }

    await this.userName.fill(account.userName);
    await this.password.fill(account.password);
    await this.loginButton.click();
    }
}