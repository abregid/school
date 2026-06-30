/**
 * support/fixtures.ts
 *
 * Shared Playwright fixtures used across all test files.
 *
 * landingPage — navigates to the landing page
 * form        — scrolls to the registration section and exposes the form POM
 */

import { test as base } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';
import { RegistrationFormPage } from './pages/RegistrationFormPage';

type Fixtures = {
    landingPage: LandingPage;
    form: RegistrationFormPage;
};

export const test = base.extend<Fixtures>({
    landingPage: async ({ page }, use) => {
        const lp = new LandingPage(page);
        await lp.navigate();
        await use(lp);
    },
    form: async ({ page, landingPage }, use) => {
        await landingPage.registrationSection.scrollIntoViewIfNeeded();
        await use(new RegistrationFormPage(page));
    },
});

export { expect } from '@playwright/test';
