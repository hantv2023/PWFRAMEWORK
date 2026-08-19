import { expect, test as base } from '@playwright/test';
import { LoginPage } from '../page_objects/login_page';
import { HomePage } from '../page_objects/home_page';
import { CartPage } from '../page_objects/cart_page'; 
import { CheckoutPage} from '..//page_objects/checkout_page';
import { ProfilePage} from '..//page_objects/profile_page';

type AppFixture = {
    loggedIn: void;
    LoginPage: LoginPage;
    HomePage: HomePage;
    CartPage: CartPage;
    CheckoutPage: CheckoutPage;
    ProfilePage: ProfilePage;
};

export const test = base.extend<AppFixture>({
    LoginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    loggedIn: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo();
        await loginPage.login('customer', 'customer01');
        await expect(page).toHaveURL(/home/);

    await use();
},
    HomePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    CartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    CheckoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    ProfilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    }
});