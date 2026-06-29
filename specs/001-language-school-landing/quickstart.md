# Quickstart & Validation Guide: Lithuanian Language School Landing Page

**Feature**: `001-language-school-landing`
**Date**: 2026-06-29
**Spec**: [spec.md](spec.md) | **Data Model**: [data-model.md](data-model.md) | **Data Contract**: [contracts/mock-data-schema.md](contracts/mock-data-schema.md)

This guide covers how to set up the project, run it locally, and manually validate every acceptance scenario from the spec.

---

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 20 LTS | `node --version` |
| npm | ≥ 10 | `npm --version` |
| A modern browser | Chrome, Firefox, or Safari (last 2 major versions) | — |

---

## Setup

```bash
# 1. From the repository root, install dependencies
npm install

# 2. Start the development server
npm run dev
# → App is live at http://localhost:3000
```

---

## Build & Static Export

```bash
# Produce the static export (output/ directory)
npm run build
# → Generates out/ with static HTML, CSS, and JS

# Serve the export locally to verify production build
npx serve out
# → Serves at http://localhost:3000 (or next available port)
```

---

## Validation Scenarios

Run these manually in a browser after `npm run dev`. Each scenario maps to an acceptance criterion in [spec.md](spec.md).

---

### Scenario 1 — School overview is visible (FR-001, User Story 1 / AC 1)

**Steps**:
1. Open `http://localhost:3000`.
2. Observe the hero / header section at the top of the page.

**Expected**:
- School name is displayed prominently.
- A brief school description is present.
- At least 3 key highlights or value propositions are visible.

---

### Scenario 2 — Three course levels are shown (FR-002, User Story 1 / AC 2)

**Steps**:
1. Scroll down to the Courses section.

**Expected**:
- Exactly 3 course level cards are displayed: Beginner, Intermediate, Advanced.
- Each card shows the level name and a short description.
- Lithuanian name appears alongside (or beneath) the English name.

---

### Scenario 3 — CTA navigates to the registration form (FR-003, User Story 1 / AC 3)

**Steps**:
1. Click the call-to-action button in the hero section.

**Expected**:
- Page scrolls to or focuses the registration form section without a full-page reload.

---

### Scenario 4 — Personal info fields accept valid input (FR-004, User Story 2 / AC 1)

**Steps**:
1. Scroll to or click the CTA to reach the registration form.
2. Type a first name, last name, email address, and phone number into their respective fields.

**Expected**:
- All four fields accept keyboard input without errors.
- No validation error is shown while the fields are being filled.

---

### Scenario 5 — Level selectors filter the teacher list (FR-005–007, User Story 2 / AC 2)

**Steps**:
1. In the registration form, select a value in the "Current level" dropdown.
2. Select a value in the "Desired level" dropdown.

**Expected**:
- The Teacher selector appears (or updates) and shows only teachers who cover the selected `(current → desired)` level combination.
- If no teachers match the combination, a friendly inline message is shown instead (edge case from spec).

---

### Scenario 6 — Teacher selection populates start dates (FR-008, User Story 2 / AC 3)

**Steps**:
1. Complete Scenario 5 to get a non-empty teacher list.
2. Select a teacher from the list.

**Expected**:
- The Start Date selector appears and shows the dates specific to the selected teacher (≥ 2 dates visible).

---

### Scenario 7 — Successful form submission shows confirmation (FR-009–010, User Story 2 / AC 4)

**Steps**:
1. Complete Scenarios 4–6 (all 8 fields filled with valid values).
2. Click the Submit / Register button.

**Expected**:
- The form disappears.
- A confirmation message is shown that includes:
  - A thank-you message.
  - The selected course level.
  - The selected teacher's name.
  - The selected start date.

---

### Scenario 8 — Missing required fields block submission (FR-009, User Story 2 / AC 5)

**Steps**:
1. Open the registration form.
2. Leave one or more required fields empty.
3. Click Submit.

**Expected**:
- Submission is blocked (no confirmation message shown).
- Empty or invalid fields are highlighted with visible error indicators.
- The form remains on screen.

---

### Scenario 9 — Dynamic reset on level change (User Story 3 / AC 3–4)

**Steps**:
1. Complete level + teacher + date selection (Scenarios 5–6).
2. Change the "Current level" or "Desired level" selection.

**Expected**:
- The teacher selection is cleared.
- The start date selection is cleared.
- The teacher list refreshes to reflect the new level combination.
- If no teachers match: friendly inline message; submit remains blocked.

---

### Scenario 10 — Dynamic reset on teacher change (User Story 3 / AC 3)

**Steps**:
1. Complete level + teacher + date selection (Scenarios 5–6).
2. Change the selected teacher.

**Expected**:
- The start date selection is cleared.
- The start date list refreshes to show only the new teacher's dates.

---

### Scenario 11 — Empty teacher list when no levels selected (User Story 3 / AC 1)

**Steps**:
1. Open the registration form without selecting any levels.

**Expected**:
- The teacher selector shows a "Select levels first" prompt or is empty/disabled.
- No teacher names are listed.

---

### Scenario 12 — Keyboard navigation reaches all sections (FR-013, SC-005)

**Steps**:
1. Press `Tab` repeatedly from the top of the page.

**Expected**:
- Focus moves through all interactive elements in a logical order.
- Navigation links, course section, and all form fields are reachable by keyboard alone.
- No focus traps outside the form.

---

## Static Export Smoke Test

After `npm run build`:

1. Run `npx serve out`.
2. Open the served URL in a browser.
3. Re-run Scenarios 1–3 to confirm the static build renders identically to `npm run dev`.
4. Verify no 404 errors appear in the browser's Network tab for page assets.

---

## Reference

| Artifact | Path |
|----------|------|
| Data types | `src/types/index.ts` |
| Mock data | `src/data/mock.ts` |
| Data contract | [contracts/mock-data-schema.md](contracts/mock-data-schema.md) |
| Entities & validation rules | [data-model.md](data-model.md) |
| Implementation tasks | `tasks.md` (Phase 2, not yet created) |
