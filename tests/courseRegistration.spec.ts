/**
 * tests/courseRegistration.spec.ts
 *
 * User Story 2 — Complete Course Registration (Priority P2)
 *
 * Covers:
 *  FR-004  Personal info fields (first name, last name, email, phone)
 *  FR-005  Current level selector
 *  FR-006  Desired level selector
 *  FR-007  Dynamic teacher list
 *  FR-008  Dynamic start-date list
 *  FR-009  Validation — blocks submission when required fields are missing or invalid
 *  FR-010  Confirmation message summarises level, teacher, and start date
 *  SC-002  Teacher / date lists update with no perceptible delay
 *  SC-003  100 % of invalid submissions are blocked
 *  SC-004  Confirmation appears within 1 second of submission
 */

import { test, expect } from '@playwright/test';
import { LandingPage } from '../support/pages/LandingPage';
import { RegistrationFormPage } from '../support/pages/RegistrationFormPage';
import {
    VALID_USER,
    VALID_REGISTRATION,
    INVALID_EMAIL_USER,
    INVALID_PHONE_USER,
    CONFIRMATION,
    START_DATES_BY_TEACHER,
    TEACHERS_BY_COMBO,
} from '../support/helpers/testData';

test.describe('User Story 2 — Complete Course Registration', () => {
    let landing: LandingPage;
    let form: RegistrationFormPage;

    test.beforeEach(async ({ page }) => {
        landing = new LandingPage(page);
        form = new RegistrationFormPage(page);
        await landing.navigate();
        // Scroll the registration section into view so all elements are reachable
        await landing.registrationSection.scrollIntoViewIfNeeded();
    });

    // ── US2 AC1: Personal info fields accept valid input ─────────────────────

    test('all personal info fields accept valid input [FR-004, US2-AC1]', async () => {
        await form.fillPersonalInfo(VALID_USER);

        await expect(form.firstNameInput).toHaveValue(VALID_USER.firstName);
        await expect(form.lastNameInput).toHaveValue(VALID_USER.lastName);
        await expect(form.emailInput).toHaveValue(VALID_USER.email);
        await expect(form.phoneInput).toHaveValue(VALID_USER.phone);
    });

    // ── US2 AC2: Level selection shows available teachers ────────────────────

    test('selecting levels reveals an enabled teacher dropdown [FR-005, FR-006, FR-007, US2-AC2]', async () => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');

        await expect(form.teacherSelect).toBeEnabled();
    });

    test('teacher list contains the correct names for beginner→intermediate [FR-007, US2-AC2]', async () => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');

        const expectedTeachers = TEACHERS_BY_COMBO['beginner→intermediate'];
        const actualOptions = await form.teacherOptions().allTextContents();

        expect(actualOptions).toHaveLength(expectedTeachers.length);
        for (const name of expectedTeachers) {
            expect(actualOptions).toContain(name);
        }
    });

    // ── US2 AC3: Teacher selection shows start dates ──────────────────────────

    test('selecting a teacher enables the date dropdown [FR-008, US2-AC3]', async () => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');

        await expect(form.dateSelect).toBeEnabled();
    });

    test('date list matches the selected teacher start dates [FR-008, US2-AC3]', async () => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');

        const expectedCount = START_DATES_BY_TEACHER['ruta-kazlauskaite'].length;
        await expect(form.dateOptions()).toHaveCount(expectedCount);
    });

    // ── US2 AC4: Successful submission shows confirmation ────────────────────

    test('happy-path submission replaces form with a confirmation message [FR-009, FR-010, US2-AC4]', async () => {
        await form.fillCompleteForm(VALID_REGISTRATION);
        await form.submit();

        await expect(form.confirmationMessage).toBeVisible();
        // Form itself must disappear
        await expect(form.submitButton).not.toBeVisible();
    });

    test('confirmation message contains the correct course level [FR-010, US2-AC4]', async () => {
        await form.fillCompleteForm(VALID_REGISTRATION);
        await form.submit();

        await expect(form.confirmationMessage).toContainText(CONFIRMATION.levelName);
    });

    test('confirmation message contains the correct teacher name [FR-010, US2-AC4]', async () => {
        await form.fillCompleteForm(VALID_REGISTRATION);
        await form.submit();

        await expect(form.confirmationMessage).toContainText(CONFIRMATION.teacherName);
    });

    test('confirmation message contains the correct formatted start date [FR-010, US2-AC4]', async () => {
        await form.fillCompleteForm(VALID_REGISTRATION);
        await form.submit();

        await expect(form.confirmationMessage).toContainText(CONFIRMATION.startDate);
    });

    test('confirmation appears within 1 second of submission [SC-004]', async () => {
        await form.fillCompleteForm(VALID_REGISTRATION);
        await form.submit();

        // Timeout of 1 000 ms asserts SC-004 directly
        await expect(form.confirmationMessage).toBeVisible({ timeout: 1000 });
    });

    // ── US2 AC5: Validation — empty required fields ──────────────────────────

    test('submitting an empty form shows errors on all required fields [FR-009, SC-003, US2-AC5]', async () => {
        await form.submit();

        await expect(form.fieldError('firstName')).toBeVisible();
        await expect(form.fieldError('lastName')).toBeVisible();
        await expect(form.fieldError('email')).toBeVisible();
        await expect(form.fieldError('phone')).toBeVisible();
        await expect(form.fieldError('currentLevel')).toBeVisible();
        await expect(form.fieldError('desiredLevel')).toBeVisible();
    });

    test('submitting with empty fields does not show confirmation [FR-009, SC-003]', async () => {
        await form.submit();

        await expect(form.confirmationMessage).not.toBeVisible();
    });

    test('submitting with only personal info filled shows level errors [FR-009, SC-003]', async () => {
        await form.fillPersonalInfo(VALID_USER);
        await form.submit();

        await expect(form.fieldError('currentLevel')).toBeVisible();
        await expect(form.fieldError('desiredLevel')).toBeVisible();
    });

    test('submitting with levels selected but no teacher shows teacher error [FR-009, SC-003]', async () => {
        await form.fillPersonalInfo(VALID_USER);
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.submit();

        await expect(form.fieldError('teacher')).toBeVisible();
    });

    test('submitting with all fields except date shows date error [FR-009, SC-003]', async () => {
        await form.fillPersonalInfo(VALID_USER);
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');
        await form.submit();

        await expect(form.fieldError('startDate')).toBeVisible();
    });

    // ── Validation — invalid formats ─────────────────────────────────────────

    test('invalid email format shows an email validation error [FR-009, SC-003]', async () => {
        await form.fillPersonalInfo(INVALID_EMAIL_USER);
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');
        await form.selectDate('2026-08-03');
        await form.submit();

        await expect(form.fieldError('email')).toBeVisible();
        await expect(form.fieldError('email')).toContainText('valid email');
        await expect(form.confirmationMessage).not.toBeVisible();
    });

    test('invalid phone format shows a phone validation error [FR-009, SC-003]', async () => {
        await form.fillPersonalInfo(INVALID_PHONE_USER);
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');
        await form.selectDate('2026-08-03');
        await form.submit();

        await expect(form.fieldError('phone')).toBeVisible();
        await expect(form.confirmationMessage).not.toBeVisible();
    });

    // ── SC-002: No perceptible delay / page reload ────────────────────────────

    test('teacher list updates without a page reload when levels change [SC-002]', async ({ page }) => {
        const navigationEvents: string[] = [];
        page.on('framenavigated', () => navigationEvents.push('navigation'));

        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await expect(form.teacherSelect).toBeEnabled();

        // No full-page navigations should have occurred
        expect(navigationEvents).toHaveLength(0);
    });

    test('date list updates without a page reload when teacher changes [SC-002]', async ({ page }) => {
        const navigationEvents: string[] = [];
        page.on('framenavigated', () => navigationEvents.push('navigation'));

        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');
        await expect(form.dateSelect).toBeEnabled();

        expect(navigationEvents).toHaveLength(0);
    });
});
