import { test } from '../core/page.fixtures';
import { expect } from '@playwright/test';
import { ProfileApi } from '../api_objects/profile_api';
import profileData from '../resources/profile.json';
import { ReportUtils } from '../core/utils';
import { step } from '../allure-js-commons';

test.afterEach(async ({ page }) => {
    await step('Step 5: Clean up the updated profile name', async () => {
        const profileApi = new ProfileApi(page.context().request);
        await profileApi.resetFullName();
    });
});

test('Update fullname successfully', async ({ page, loggedIn, HomePage, ProfilePage }) => {
    void loggedIn;

    await step('Step 1: Navigate to the profile page', async () => {
        await HomePage.gotoProfile();
    });

    await step('Step 2: Verify the initial full name', async () => {
        await ProfilePage.verifyFullName(profileData.name);
    });

    await step('Step 3: Update the full name', async () => {
        await ProfilePage.profilesave('hanguyen');
        await ProfilePage.submitbutton.click();
    });

    await step('Step 4: Verify the profile update succeeded', async () => {
        await ReportUtils.attachScreenshot('Profile update success', page, async () => {
            await expect(ProfilePage.successMessage).toBeVisible();
        });
    });
});