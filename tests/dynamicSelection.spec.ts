/**
 * tests/dynamicSelection.spec.ts
 *
 * User Story 3 — Dynamic Teacher & Date Selection (Priority P3)
 *
 * Covers:
 *  FR-007  Teacher list is filtered by the chosen level combination
 *  FR-008  Date list is filtered by the chosen teacher
 *  US3-AC1 Teacher select is disabled / shows a prompt before levels are chosen
 *  US3-AC2 Teacher list refreshes when levels change
 *  US3-AC3 Date list resets when the teacher changes
 *  US3-AC4 Friendly message when no teachers match the combination
 *
 * Edge cases:
 *  - Changing level after teacher is selected resets both teacher and date
 *  - Submission is blocked when no teachers are available
 */

import { test, expect } from '../support/fixtures';
import {
    VALID_USER,
    TEACHERS_BY_COMBO,
    START_DATES_BY_TEACHER,
    NO_TEACHER_COMBOS,
} from '../support/helpers/testData';

test.describe('User Story 3 — Dynamic Teacher & Date Selection', () => {

    // ── US3 AC1: Initial state — both selects disabled ────────────────────────

    test('teacher dropdown is disabled on page load [US3-AC1, FR-007]', async ({ form }) => {
        await expect(form.teacherSelect).toBeDisabled();
    });

    test('teacher hint prompts user to select levels first [US3-AC1, FR-007]', async ({ form }) => {
        await expect(form.teacherHint).toBeVisible();
        await expect(form.teacherHint).toContainText('Please select your current and desired levels first');
    });

    test('date dropdown is disabled on page load', async ({ form }) => {
        await expect(form.dateSelect).toBeDisabled();
    });

    test('date hint prompts user to select a teacher [FR-008]', async ({ form }) => {
        await expect(form.dateHint).toBeVisible();
        await expect(form.dateHint).toContainText('Please select a teacher to see available start dates');
    });

    // ── US3 AC2: Teacher list refreshes when levels change ───────────────────

    test('teacher list populates after both levels are chosen [US3-AC2, FR-007]', async ({ form }) => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');

        await expect(form.teacherSelect).toBeEnabled();
        await expect(form.teacherOptions()).toHaveCount(
            TEACHERS_BY_COMBO['beginner→intermediate'].length,
        );
    });

    test('changing level combination updates the teacher list [US3-AC2, FR-007]', async ({ form }) => {
        // First combination: beginner → beginner
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('beginner');
        await expect(form.teacherOptions()).toHaveCount(TEACHERS_BY_COMBO['beginner→beginner'].length);
        const firstList = await form.teacherOptions().allTextContents();

        // Second combination: intermediate → advanced
        await form.selectCurrentLevel('intermediate');
        await form.selectDesiredLevel('advanced');
        await expect(form.teacherOptions()).toHaveCount(TEACHERS_BY_COMBO['intermediate→advanced'].length);
        const secondList = await form.teacherOptions().allTextContents();

        expect(firstList).not.toEqual(secondList);
    });

    test('each level combination exposes the correct teacher names [US3-AC2, FR-007]', async ({ form }) => {
        const combosToCheck: Array<[string, string, string]> = [
            ['beginner', 'beginner', 'beginner→beginner'],
            ['beginner', 'intermediate', 'beginner→intermediate'],
            ['intermediate', 'intermediate', 'intermediate→intermediate'],
            ['intermediate', 'advanced', 'intermediate→advanced'],
            ['advanced', 'advanced', 'advanced→advanced'],
        ];

        for (const [from, to, key] of combosToCheck) {
            await form.selectCurrentLevel(from);
            await form.selectDesiredLevel(to);

            await expect(form.teacherOptions()).toHaveCount(TEACHERS_BY_COMBO[key].length);
            const actualNames = await form.teacherOptions().allTextContents();
            for (const expected of TEACHERS_BY_COMBO[key]) {
                expect(actualNames, `Combo ${key} should include ${expected}`).toContain(expected);
            }
        }
    });

    // ── US3 AC3: Date list resets and shows teacher-specific dates ────────────

    test('date list populates after a teacher is selected [US3-AC3, FR-008]', async ({ form }) => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');

        await expect(form.dateSelect).toBeEnabled();
        await expect(form.dateOptions()).toHaveCount(
            START_DATES_BY_TEACHER['ruta-kazlauskaite'].length,
        );
    });

    test('changing teacher updates the date list [US3-AC3, FR-008]', async ({ form }) => {
        // Select combo beginner → beginner and first teacher: Rūta (2 dates)
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('beginner');
        await form.selectTeacher('ruta-kazlauskaite');
        await expect(form.dateOptions()).toHaveCount(START_DATES_BY_TEACHER['ruta-kazlauskaite'].length);
        const rutaDates = await form.dateOptions().allTextContents();

        // Switch to Viktorija (3 dates) within the same combo
        await form.selectTeacher('viktorija-stankeviciene');
        await expect(form.dateOptions()).toHaveCount(START_DATES_BY_TEACHER['viktorija-stankeviciene'].length);
        const viktoriaDates = await form.dateOptions().allTextContents();

        expect(rutaDates).not.toEqual(viktoriaDates);
    });

    test('date hint disappears once a teacher is selected [FR-008]', async ({ form }) => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');

        await expect(form.dateHint).not.toBeVisible();
    });

    // ── US3 AC4: No matching teachers ────────────────────────────────────────

    test('friendly "no teachers" hint is shown when combination has no match [US3-AC4, FR-007]', async ({ form }) => {
        // beginner → advanced has no teachers in mock data
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('advanced');

        await expect(form.teacherHint).toBeVisible();
        await expect(form.teacherHint).toContainText('No teachers available for this combination');
    });

    test('teacher dropdown stays disabled when no teachers match [US3-AC4, FR-007]', async ({ form }) => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('advanced');

        await expect(form.teacherSelect).toBeDisabled();
    });

    for (const { currentLevelId, desiredLevelId } of NO_TEACHER_COMBOS) {
        test(`no teacher hint shown for ${currentLevelId}→${desiredLevelId} [US3-AC4]`, async ({ form }) => {
            await form.selectCurrentLevel(currentLevelId);
            await form.selectDesiredLevel(desiredLevelId);

            await expect(form.teacherHint).toContainText('No teachers available for this combination');
        });
    }

    // ── Edge case: Level change resets teacher and date ───────────────────────

    test('changing current level after teacher selection clears the teacher [edge case]', async ({ form }) => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');
        await form.selectDate('2026-08-03');

        // Change the current level — resets teacher & date
        await form.selectCurrentLevel('intermediate');

        await expect(form.teacherSelect).toHaveValue('');
        await expect(form.dateSelect).toBeDisabled();
    });

    test('changing desired level after teacher selection clears the teacher [edge case]', async ({ form }) => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');
        await form.selectDate('2026-08-03');

        // Change desired level — resets teacher & date
        await form.selectDesiredLevel('beginner');

        await expect(form.teacherSelect).toHaveValue('');
        await expect(form.dateSelect).toBeDisabled();
    });

    test('teacher hint reappears after level change clears teacher [edge case]', async ({ form }) => {
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('intermediate');
        await form.selectTeacher('ruta-kazlauskaite');
        // Move to a combo with no teachers
        await form.selectDesiredLevel('advanced');

        await expect(form.teacherHint).toBeVisible();
        await expect(form.teacherHint).toContainText('No teachers available for this combination');
    });

    // ── Edge case: Submission blocked when no teachers available ──────────────

    test('form submission is blocked when the level combination has no teachers [edge case, FR-009]', async ({ form }) => {
        await form.fillPersonalInfo(VALID_USER);
        await form.selectCurrentLevel('beginner');
        await form.selectDesiredLevel('advanced'); // no teachers
        await form.submit();

        // Confirmation must not appear
        await expect(form.confirmationMessage).not.toBeVisible();
        // The "no teachers" hint remains as the visible error signal
        await expect(form.teacherHint).toContainText('No teachers available for this combination');
    });
});
