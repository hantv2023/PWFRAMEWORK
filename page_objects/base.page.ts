import { Page } from '@playwright/test';

export class BasePage {
	constructor(public readonly page: Page) {}

	protected async goto(url: string): Promise<void> {
		await this.page.goto(url);
	}
}
