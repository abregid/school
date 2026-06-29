import { type Page, type Locator } from '@playwright/test';

// ---------------------------------------------------------------------------
// Argument types
// ---------------------------------------------------------------------------

export interface PersonalInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}

export interface FullRegistration extends Required<PersonalInfo> {
    currentLevelId: string;
    desiredLevelId: string;
    teacherId: string;
    startDate: string;
}

// ---------------------------------------------------------------------------
// Page Object
// ---------------------------------------------------------------------------

/**
 * Page Object for the course registration form section.
 *
 * Selectors are keyed to element `id` attributes and ARIA roles defined in
 * PersonalInfoFields, LevelSelect, TeacherSelect, DateSelect, and
 * ConfirmationMessage components.
 */
export class RegistrationFormPage {
    readonly page: Page;

    // ── Personal info inputs ───────────────────────────────────────────────────
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;

    // ── Course-selection dropdowns ─────────────────────────────────────────────
    readonly currentLevelSelect: Locator;
    readonly desiredLevelSelect: Locator;
    readonly teacherSelect: Locator;
    readonly dateSelect: Locator;

    // ── Submit ─────────────────────────────────────────────────────────────────
    readonly submitButton: Locator;

    // ── Post-submission feedback ───────────────────────────────────────────────
    /** Confirmation block shown after a successful submit (role="status"). */
    readonly confirmationMessage: Locator;

    // ── Inline hints ───────────────────────────────────────────────────────────
    /** Hint shown in TeacherSelect when levels are unset or no teachers match. */
    readonly teacherHint: Locator;
    /** Hint shown in DateSelect when no teacher is selected yet. */
    readonly dateHint: Locator;

    constructor(page: Page) {
        this.page = page;

        // Personal info — ids come from PersonalInfoFields.tsx
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#email');
        this.phoneInput = page.locator('#phone');

        // Dropdowns — ids come from LevelSelect / TeacherSelect / DateSelect
        this.currentLevelSelect = page.locator('#currentLevel');
        this.desiredLevelSelect = page.locator('#desiredLevel');
        this.teacherSelect = page.locator('#teacher');
        this.dateSelect = page.locator('#startDate');

        // Submit
        this.submitButton = page.getByRole('button', { name: 'Submit Registration' });

        // Feedback
        this.confirmationMessage = page.getByRole('status');

        // Hints
        this.teacherHint = page.locator('#teacher-hint');
        this.dateHint = page.locator('#startDate-hint');
    }

    // ── Fill helpers ─────────────────────────────────────────────────────────

    /** Fill only the personal info fields (any subset). */
    async fillPersonalInfo(data: PersonalInfo): Promise<void> {
        if (data.firstName !== undefined) await this.firstNameInput.fill(data.firstName);
        if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
        if (data.email !== undefined) await this.emailInput.fill(data.email);
        if (data.phone !== undefined) await this.phoneInput.fill(data.phone);
    }

    async selectCurrentLevel(levelId: string): Promise<void> {
        await this.currentLevelSelect.selectOption(levelId);
    }

    async selectDesiredLevel(levelId: string): Promise<void> {
        await this.desiredLevelSelect.selectOption(levelId);
    }

    async selectTeacher(teacherId: string): Promise<void> {
        await this.teacherSelect.selectOption(teacherId);
    }

    async selectDate(date: string): Promise<void> {
        await this.dateSelect.selectOption(date);
    }

    /** Fill every form field in a single call — use for happy-path tests. */
    async fillCompleteForm(data: FullRegistration): Promise<void> {
        await this.fillPersonalInfo(data);
        await this.selectCurrentLevel(data.currentLevelId);
        await this.selectDesiredLevel(data.desiredLevelId);
        await this.selectTeacher(data.teacherId);
        await this.selectDate(data.startDate);
    }

    async submit(): Promise<void> {
        await this.submitButton.click();
    }

    // ── Error / option helpers ────────────────────────────────────────────────

    /**
     * Inline field-error element for the given field.
     * Convention: `#<fieldId>-error` (matches component markup).
     */
    fieldError(fieldId: string): Locator {
        return this.page.locator(`#${fieldId}-error`);
    }

    /**
     * Non-placeholder options in the teacher <select>.
     * The placeholder `<option value="" disabled>` is excluded.
     */
    teacherOptions(): Locator {
        return this.teacherSelect.locator('option:not([disabled])');
    }

    /**
     * Non-placeholder options in the start-date <select>.
     * The placeholder `<option value="" disabled>` is excluded.
     */
    dateOptions(): Locator {
        return this.dateSelect.locator('option:not([disabled])');
    }
}
