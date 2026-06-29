import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object for the Lithuanian Language School landing page.
 *
 * Encapsulates selectors and navigation actions so tests never
 * hard-code locators directly.
 */
export class LandingPage {
    readonly page: Page;

    // ── Header ─────────────────────────────────────────────────────────────────
    readonly header: Locator;
    readonly logo: Locator;
    /** "Courses" link in the main nav. */
    readonly navCoursesLink: Locator;
    /** "Register" link in the main nav. */
    readonly navRegisterLink: Locator;

    // ── Hero section ────────────────────────────────────────────────────────────
    readonly heroSection: Locator;
    /** The school's <h1> name. */
    readonly schoolName: Locator;
    /** Paragraph with the school description (first <p> inside the hero). */
    readonly schoolDescription: Locator;
    /** Each <li> inside the "School highlights" list. */
    readonly schoolHighlights: Locator;
    /** "Register for a Course" CTA link inside the hero. */
    readonly ctaButton: Locator;

    // ── Courses section ─────────────────────────────────────────────────────────
    readonly coursesSection: Locator;
    readonly coursesHeading: Locator;
    /** All course-level <article> cards. */
    readonly courseCards: Locator;

    // ── Registration section ────────────────────────────────────────────────────
    readonly registrationSection: Locator;
    readonly registrationHeading: Locator;

    // ── Footer ──────────────────────────────────────────────────────────────────
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;

        // Header
        this.header = page.locator('header');
        this.logo = page.getByRole('link', { name: 'Lietuvių Kalba — home' });
        const mainNav = page.getByRole('navigation', { name: 'Main navigation' });
        this.navCoursesLink = mainNav.getByRole('link', { name: 'Courses', exact: true });
        this.navRegisterLink = mainNav.getByRole('link', { name: 'Register', exact: true });

        // Hero
        this.heroSection = page.locator('section[aria-labelledby="hero-heading"]');
        this.schoolName = page.getByRole('heading', { level: 1 });
        this.schoolDescription = this.heroSection.locator('p').first();
        this.schoolHighlights = page.getByLabel('School highlights').locator('li');
        this.ctaButton = this.heroSection.getByRole('link', { name: 'Register for a Course' });

        // Courses
        this.coursesSection = page.locator('#courses');
        this.coursesHeading = page.getByRole('heading', { name: 'Our Courses', level: 2 });
        this.courseCards = page.getByRole('article');

        // Registration
        this.registrationSection = page.locator('#register');
        this.registrationHeading = page.getByRole('heading', { name: 'Register for a Course', level: 2 });

        // Footer
        this.footer = page.locator('footer');
    }

    // ── Actions ─────────────────────────────────────────────────────────────────

    /** Navigate to the application root. */
    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    /** Click the hero CTA and wait for scroll. */
    async clickCTA(): Promise<void> {
        await this.ctaButton.click();
    }

    /**
     * Return the <article> card whose <h3> heading matches `name`.
     * Useful for asserting individual course cards.
     */
    getCourseCard(name: string): Locator {
        return this.courseCards.filter({
            has: this.page.getByRole('heading', { name, level: 3 }),
        });
    }
}
