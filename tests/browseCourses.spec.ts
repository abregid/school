/**
 * tests/browseCourses.spec.ts
 *
 * User Story 1 — Browse School & Courses (Priority P1)
 *
 * Covers:
 *  FR-001  School overview section visible with name, description, highlights
 *  FR-002  Courses section lists ≥ 3 levels, each with a name and description
 *  FR-003  Prominent CTA that scrolls to the registration form
 *  FR-013  Key landmarks present and reachable
 */

import { test, expect } from '@playwright/test';
import { LandingPage } from '../support/pages/LandingPage';
import { COURSE_LEVELS } from '../support/helpers/testData';

test.describe('User Story 1 — Browse School & Courses', () => {
    let landingPage: LandingPage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        await landingPage.navigate();
    });

    // ── US1 AC1: School overview ─────────────────────────────────────────────

    test('school name is displayed as the main heading [FR-001, US1-AC1]', async () => {
        await expect(landingPage.schoolName).toBeVisible();
        await expect(landingPage.schoolName).toContainText('Lietuvių Kalba');
    });

    test('school description paragraph is visible [FR-001, US1-AC1]', async () => {
        await expect(landingPage.schoolDescription).toBeVisible();
        // Description must be non-trivial (spec: "brief description")
        const text = await landingPage.schoolDescription.textContent();
        expect((text ?? '').trim().length).toBeGreaterThan(20);
    });

    test('at least three school highlights are listed [FR-001, US1-AC1]', async () => {
        await expect(landingPage.schoolHighlights).toHaveCount(
            await landingPage.schoolHighlights.count(),
        );
        const count = await landingPage.schoolHighlights.count();
        expect(count).toBeGreaterThanOrEqual(3);
    });

    // ── US1 AC2: Courses section ─────────────────────────────────────────────

    test('courses section heading is visible after scroll [FR-002, US1-AC2]', async () => {
        await landingPage.coursesSection.scrollIntoViewIfNeeded();
        await expect(landingPage.coursesHeading).toBeVisible();
    });

    test('exactly three course-level cards are displayed [FR-002, US1-AC2]', async () => {
        await landingPage.coursesSection.scrollIntoViewIfNeeded();
        await expect(landingPage.courseCards).toHaveCount(3);
    });

    for (const { name, nameLT } of COURSE_LEVELS) {
        test(`course card "${name}" is visible with a non-empty description [FR-002, US1-AC2]`, async () => {
            await landingPage.coursesSection.scrollIntoViewIfNeeded();
            const card = landingPage.getCourseCard(name);
            await expect(card).toBeVisible();

            // The last <p> inside the card holds the description
            const description = card.locator('p').last();
            await expect(description).not.toBeEmpty();
        });

        test(`course card "${name}" shows its Lithuanian name "${nameLT}" [FR-002]`, async () => {
            await landingPage.coursesSection.scrollIntoViewIfNeeded();
            const card = landingPage.getCourseCard(name);
            await expect(card.getByText(nameLT)).toBeVisible();
        });
    }

    // ── US1 AC3: CTA navigation ──────────────────────────────────────────────

    test('hero CTA scrolls page to the registration section [FR-003, US1-AC3]', async () => {
        await landingPage.clickCTA();
        await expect(landingPage.registrationSection).toBeInViewport({ ratio: 0.1 });
    });

    test('"Register for a Course" heading is visible in the registration section [FR-003]', async () => {
        await landingPage.clickCTA();
        await expect(landingPage.registrationHeading).toBeVisible();
    });

    // ── Navigation / landmarks (FR-013) ──────────────────────────────────────

    test('site header is visible and contains logo [FR-013]', async () => {
        await expect(landingPage.header).toBeVisible();
        await expect(landingPage.logo).toBeVisible();
    });

    test('main navigation contains Courses and Register links [FR-013]', async () => {
        await expect(landingPage.navCoursesLink).toBeVisible();
        await expect(landingPage.navRegisterLink).toBeVisible();
    });

    test('"Courses" nav link scrolls to the courses section [FR-013]', async () => {
        await landingPage.navCoursesLink.click();
        await expect(landingPage.coursesSection).toBeInViewport({ ratio: 0.1 });
    });

    test('"Register" nav link scrolls to the registration section [FR-013]', async () => {
        await landingPage.navRegisterLink.click();
        await expect(landingPage.registrationSection).toBeInViewport({ ratio: 0.1 });
    });

    test('site footer is visible [FR-013]', async () => {
        await landingPage.footer.scrollIntoViewIfNeeded();
        await expect(landingPage.footer).toBeVisible();
    });

    // ── Keyboard accessibility (SC-005) ──────────────────────────────────────

    test('logo and nav links are reachable via keyboard Tab [SC-005, FR-013]', async ({ page }) => {
        // Tab order on page load: logo → Courses → Register
        await page.keyboard.press('Tab');
        await expect(landingPage.logo).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(landingPage.navCoursesLink).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(landingPage.navRegisterLink).toBeFocused();
    });
});
