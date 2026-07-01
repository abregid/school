# Test Plan: Lithuanian Language School Landing Page

**Feature Branch**: `001-language-school-landing`
**Spec Reference**: [spec.md](spec.md)
**Date**: 2026-07-01
**Status**: Active

---

## 1. Objectives

- Verify that all acceptance criteria from the three user stories are met.
- Confirm every functional requirement (FR-001 – FR-013) is covered by at least one automated test.
- Validate all success criteria (SC-001 – SC-005) are measurable and pass.
- Ensure edge cases described in the spec are explicitly handled and regression-proof.

---

## 2. Scope

### In Scope

| Area | Rationale |
|---|---|
| School overview section (hero, highlights) | FR-001, US1-AC1 |
| Courses section (3 level cards) | FR-002, US1-AC2 |
| CTA navigation to registration form | FR-003, US1-AC3 |
| Registration form — personal info fields | FR-004, US2-AC1 |
| Level selectors (current & desired) | FR-005, FR-006, US2-AC2 |
| Dynamic teacher filtering | FR-007, US2-AC2, US3-AC1–4 |
| Dynamic start-date filtering | FR-008, US2-AC3, US3-AC3 |
| Form validation & error messaging | FR-009, US2-AC5, SC-003 |
| Confirmation message on success | FR-010, US2-AC4, SC-004 |
| Page landmarks and keyboard navigation | FR-013, SC-005 |
| No-page-reload dynamic updates | SC-002 |
| Edge cases (no teachers, cascade reset, blocked submission) | spec § Edge Cases |

### Out of Scope

- Backend/server integration (none exists; all data is embedded)
- Payment or account creation flows (not in v1)
- Mobile / sub-1024 px viewports (FR-012: desktop only)
- JavaScript-disabled fallback (static message only; not programmatically testable in a Playwright run)
- Visual regression / pixel-perfect design checks (FR-011 is verified manually)
- Performance profiling beyond the 1-second confirmation timeout (SC-004)

---

## 3. Test Approach

| Layer | Tool | Scope |
|---|---|---|
| End-to-end (E2E) | Playwright | All three user stories, edge cases, success criteria |
| Manual smoke check | Browser (desktop) | FR-011 visual design, FR-012 viewport, SC-001 3-minute flow |

All automated tests use the Page Object pattern via `support/pages/LandingPage.ts` and `support/pages/RegistrationFormPage.ts`. Test data constants live in `support/helpers/testData.ts` and mirror the embedded mock in `src/data/mock.ts`.

---

## 4. Test Environment

| Setting | Value |
|---|---|
| Base URL | `http://localhost:3000` (served by `next start` or `npx serve out/`) |
| Browser | Chromium (primary), Firefox, WebKit |
| Viewport | 1280 × 720 (desktop) |
| JavaScript | Enabled |
| Network | Local — no external calls |
| Node.js | 20 LTS |

Run all tests with:

```bash
npx playwright test
```

Run a single suite:

```bash
npx playwright test tests/browseCourses.spec.ts
```

---

## 5. Test Suites

### 5.1 Suite: Browse School & Courses (`tests/browseCourses.spec.ts`)

**User Story**: US1 — Priority P1
**Can run independently**: Yes — no form interaction required.

| # | Test ID | Description | FR / SC | Acceptance Criteria |
|---|---|---|---|---|
| 1 | `US1-AC1-01` | School name `<h1>` is visible and contains "Lietuvių Kalba" | FR-001 | US1-AC1 |
| 2 | `US1-AC1-02` | School description paragraph is visible and ≥ 20 characters | FR-001 | US1-AC1 |
| 3 | `US1-AC1-03` | At least three school highlights are listed | FR-001 | US1-AC1 |
| 4 | `US1-AC2-01` | Courses section heading is visible after scroll | FR-002 | US1-AC2 |
| 5 | `US1-AC2-02` | Exactly three course-level cards are displayed | FR-002 | US1-AC2 |
| 6 | `US1-AC2-03` | Each course card (Beginner, Intermediate, Advanced) is visible with a non-empty description | FR-002 | US1-AC2 |
| 7 | `US1-AC2-04` | Each course card shows its Lithuanian name | FR-002 | US1-AC2 |
| 8 | `US1-AC3-01` | Hero CTA scrolls page to the registration section (≥ 50 % in viewport) | FR-003 | US1-AC3 |
| 9 | `US1-AC3-02` | "Register for a Course" heading is visible in the registration section | FR-003 | US1-AC3 |
| 10 | `US1-NAV-01` | Site header and logo are visible | FR-013 | — |
| 11 | `US1-NAV-02` | Main navigation contains "Courses" and "Register" links | FR-013 | — |
| 12 | `US1-NAV-03` | "Courses" nav link scrolls to the courses section | FR-013 | — |
| 13 | `US1-NAV-04` | "Register" nav link scrolls to the registration section | FR-013 | — |
| 14 | `US1-NAV-05` | Site footer is visible | FR-013 | — |
| 15 | `US1-A11Y-01` | Logo and nav links are reachable via Tab key in correct order | SC-005, FR-013 | — |

**Pass criteria**: All 15 tests green. Page loads without errors. All three course cards present.

---

### 5.2 Suite: Complete Course Registration (`tests/courseRegistration.spec.ts`)

**User Story**: US2 — Priority P2
**Can run independently**: Yes — uses a fixed valid registration fixture.

| # | Test ID | Description | FR / SC | Acceptance Criteria |
|---|---|---|---|---|
| 1 | `US2-AC1-01` | All four personal info fields accept valid input | FR-004 | US2-AC1 |
| 2 | `US2-AC2-01` | Selecting current + desired levels enables the teacher dropdown | FR-005, FR-006, FR-007 | US2-AC2 |
| 3 | `US2-AC2-02` | Teacher list contains correct names for `beginner→intermediate` combo | FR-007 | US2-AC2 |
| 4 | `US2-AC3-01` | Selecting a teacher enables the date dropdown | FR-008 | US2-AC3 |
| 5 | `US2-AC3-02` | Date list matches the selected teacher's start dates | FR-008 | US2-AC3 |
| 6 | `US2-AC4-01` | Happy-path submission replaces form with confirmation message | FR-009, FR-010 | US2-AC4 |
| 7 | `US2-AC4-02` | Confirmation message contains the correct course level name | FR-010 | US2-AC4 |
| 8 | `US2-AC4-03` | Confirmation message contains the correct teacher name | FR-010 | US2-AC4 |
| 9 | `US2-AC4-04` | Confirmation message contains the correct formatted start date | FR-010 | US2-AC4 |
| 10 | `US2-AC4-05` | Confirmation appears within 1 000 ms of submission | SC-004 | US2-AC4 |
| 11 | `US2-AC5-01` | Submitting empty form shows errors on all 6 required fields | FR-009, SC-003 | US2-AC5 |
| 12 | `US2-AC5-02` | Submitting empty form does not show confirmation message | FR-009, SC-003 | US2-AC5 |
| 13 | `US2-AC5-03` | Personal info only → level fields still show errors | FR-009, SC-003 | US2-AC5 |
| 14 | `US2-AC5-04` | Personal info + levels, no teacher → teacher error shown | FR-009, SC-003 | US2-AC5 |
| 15 | `US2-AC5-05` | All fields except date → date error shown | FR-009, SC-003 | US2-AC5 |
| 16 | `US2-VAL-01` | Invalid email format shows email validation error and blocks submission | FR-009, SC-003 | US2-AC5 |
| 17 | `US2-VAL-02` | Invalid phone format shows phone validation error and blocks submission | FR-009, SC-003 | US2-AC5 |
| 18 | `US2-SC002-01` | Teacher list updates without a page reload when levels change | SC-002 | — |
| 19 | `US2-SC002-02` | Date list updates without a page reload when teacher changes | SC-002 | — |

**Pass criteria**: All 19 tests green. Confirmation appears in ≤ 1 s. Zero full-page navigations during dynamic updates.

---

### 5.3 Suite: Dynamic Teacher & Date Selection (`tests/dynamicSelection.spec.ts`)

**User Story**: US3 — Priority P3
**Can run independently**: Yes — tests level/teacher/date interaction in isolation.

| # | Test ID | Description | FR / SC | Acceptance Criteria |
|---|---|---|---|---|
| 1 | `US3-AC1-01` | Teacher dropdown is disabled on page load | FR-007 | US3-AC1 |
| 2 | `US3-AC1-02` | Teacher hint prompts "Please select your current and desired levels first" | FR-007 | US3-AC1 |
| 3 | `US3-AC1-03` | Date dropdown is disabled on page load | FR-008 | US3-AC1 |
| 4 | `US3-AC1-04` | Date hint prompts "Please select a teacher to see available start dates" | FR-008 | US3-AC1 |
| 5 | `US3-AC2-01` | Teacher list populates after both levels are selected | FR-007 | US3-AC2 |
| 6 | `US3-AC2-02` | Changing level combination updates the teacher list | FR-007 | US3-AC2 |
| 7 | `US3-AC2-03` | Each tested level combo exposes exactly the correct teacher names | FR-007 | US3-AC2 |
| 8 | `US3-AC3-01` | Date list populates after a teacher is selected | FR-008 | US3-AC3 |
| 9 | `US3-AC3-02` | Changing teacher updates the date list | FR-008 | US3-AC3 |
| 10 | `US3-AC3-03` | Date hint disappears once a teacher is selected | FR-008 | US3-AC3 |
| 11 | `US3-AC4-01` | Friendly "No teachers available" hint shown for `beginner→advanced` | FR-007 | US3-AC4 |
| 12 | `US3-AC4-02` | Teacher dropdown stays disabled when no teachers match | FR-007 | US3-AC4 |
| 13 | `US3-AC4-03` | "No teachers" hint shown for every known zero-match combo | FR-007 | US3-AC4 |
| 14 | `US3-EDGE-01` | Changing current level after teacher selection clears teacher and disables date | spec edge cases | — |
| 15 | `US3-EDGE-02` | Changing desired level after teacher selection clears teacher and disables date | spec edge cases | — |
| 16 | `US3-EDGE-03` | Teacher hint reappears after level change moves to a no-match combo | spec edge cases | — |
| 17 | `US3-EDGE-04` | Submission is blocked when level combo has no available teachers | FR-009, spec edge cases | — |

**Pass criteria**: All 17 tests green. Cascade reset clears dependent fields reliably. Submission always blocked on no-teacher combos.

---

## 6. Edge Cases

These are covered explicitly by tests in Suite 5.3 and 5.2, and represent the minimum regression surface for the form's state machine.

| Edge Case | Covered By | Expected Behaviour |
|---|---|---|
| Level combo with no matching teachers (`beginner→advanced`) | `US3-AC4-01`, `US3-AC4-02`, `US3-AC4-03` | Friendly inline message; teacher dropdown disabled; submission blocked |
| Submit with missing required fields | `US2-AC5-01` – `US2-AC5-05` | Each empty field highlighted; confirmation never shown |
| Changing level after teacher + date selected | `US3-EDGE-01`, `US3-EDGE-02` | Teacher value reset to `""`; date dropdown disabled |
| Invalid email format | `US2-VAL-01` | Error shown on email field; submission blocked |
| Invalid phone format | `US2-VAL-02` | Error shown on phone field; submission blocked |
| Submit when no teachers available (all personal info filled) | `US3-EDGE-04` | Confirmation absent; "no teachers" hint still visible |

---

## 7. Test Data

All test data is defined in `support/helpers/testData.ts` and mirrors `src/data/mock.ts`.

| Constant | Description | Used In |
|---|---|---|
| `VALID_USER` | First name, last name, valid email, valid phone | US2-AC1, validation tests |
| `VALID_REGISTRATION` | Full happy-path fixture including levels, teacher ID, start date | US2-AC4 |
| `INVALID_EMAIL_USER` | User with a malformed email (no `@`) | `US2-VAL-01` |
| `INVALID_PHONE_USER` | User with letters in the phone field | `US2-VAL-02` |
| `CONFIRMATION` | Expected level name, teacher name, formatted date on confirmation screen | US2-AC4 |
| `COURSE_LEVELS` | Array of `{ name, nameLT }` for all 3 levels | US1-AC2 loop |
| `TEACHERS_BY_COMBO` | Map of `"from→to"` → `string[]` of teacher names | US2-AC2, US3-AC2 |
| `START_DATES_BY_TEACHER` | Map of teacher ID → count of start dates | US2-AC3, US3-AC3 |
| `NO_TEACHER_COMBOS` | Array of `{ currentLevelId, desiredLevelId }` with no matching teachers | US3-AC4 loop |

---

## 8. Requirements Coverage Matrix

| Requirement | Description (short) | Suite | Test IDs |
|---|---|---|---|
| FR-001 | School overview (name, description, highlights) | 5.1 | US1-AC1-01 – US1-AC1-03 |
| FR-002 | Courses section with ≥ 3 level cards | 5.1 | US1-AC2-01 – US1-AC2-04 |
| FR-003 | CTA opens / scrolls to registration form | 5.1 | US1-AC3-01 – US1-AC3-02 |
| FR-004 | Personal info fields (first name, last name, email, phone) | 5.2 | US2-AC1-01, US2-VAL-01, US2-VAL-02 |
| FR-005 | Current level selector | 5.2 | US2-AC2-01 |
| FR-006 | Desired level selector | 5.2 | US2-AC2-01 |
| FR-007 | Dynamic teacher list by level combo | 5.2, 5.3 | US2-AC2-02, US3-AC1-01–02, US3-AC2-01–03, US3-AC4-01–03 |
| FR-008 | Dynamic start-date list by teacher | 5.2, 5.3 | US2-AC3-01–02, US3-AC1-03–04, US3-AC3-01–03 |
| FR-009 | Validation before submission | 5.2, 5.3 | US2-AC5-01–05, US2-VAL-01–02, US3-EDGE-04 |
| FR-010 | Confirmation message with level, teacher, date | 5.2 | US2-AC4-01–04 |
| FR-011 | Sleek modern visual design | Manual smoke | — |
| FR-012 | Usable on desktop viewport | Manual smoke | — |
| FR-013 | Semantic landmarks; keyboard navigable | 5.1 | US1-NAV-01–05, US1-A11Y-01 |
| SC-001 | Registration completable in < 3 minutes | Manual smoke | — |
| SC-002 | Teacher/date update with no perceptible delay | 5.2 | US2-SC002-01–02 |
| SC-003 | 100 % of invalid submissions blocked | 5.2 | US2-AC5-01–05, US2-VAL-01–02 |
| SC-004 | Confirmation within 1 second | 5.2 | US2-AC4-05 |
| SC-005 | All sections keyboard-navigable | 5.1 | US1-A11Y-01 |

---

## 9. Manual Smoke Checklist

Perform once before any release on a clean `npm run build && npx serve out` build:

- [ ] **FR-011** — Visual design is consistent (typography, colour palette, spacing match design intent).
- [ ] **FR-012** — Page layout is intact and readable at 1280 × 720; no horizontal overflow.
- [ ] **SC-001** — A tester with no prior knowledge can find the form and complete a full registration in under 3 minutes.
- [ ] **SC-005** — Tab through the entire page; confirm focus is visible at every interactive element and all major sections are reachable without a mouse.

---

## 10. Entry & Exit Criteria

### Entry Criteria (before running automated tests)

- `npm run build` exits with code `0`.
- Dev server (`npm run dev` or `npx serve out/`) is reachable at the configured base URL.
- `src/data/mock.ts` contains ≥ 5 teachers, exactly 3 course levels, and ≥ 2 start dates per teacher.

### Exit Criteria (tests considered passing)

- All 51 automated tests (15 + 19 + 17) are green across Chromium, Firefox, and WebKit.
- No `FAILED` or `TIMED OUT` results in `playwright-report/`.
- Manual smoke checklist is fully checked.

---

## 11. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Mock data changes break `TEACHERS_BY_COMBO` / `START_DATES_BY_TEACHER` | Medium | High | Keep `testData.ts` in sync with `mock.ts`; treat them as a contract |
| Flaky scroll-to-viewport assertions | Low | Medium | Use `scrollIntoViewIfNeeded()` + `toBeInViewport({ ratio: 0.5 })` |
| Teacher/date dropdowns not yet updated when assertions run | Low | Medium | Use Playwright auto-retry via `toHaveCount()` before `allTextContents()` |
| WebKit timing differences on 1 s confirmation check | Low | Low | `SC-004` uses `toBeVisible({ timeout: 1000 })` which Playwright retries |
| `beginner→advanced` combo gaining a teacher in future data updates | Medium | Medium | `NO_TEACHER_COMBOS` constant makes the zero-match set explicit and must be updated alongside `mock.ts` |
