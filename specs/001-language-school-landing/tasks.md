# Tasks: Lithuanian Language School Landing Page

**Input**: Design documents from `specs/001-language-school-landing/`

**Prerequisites**: [plan.md](plan.md) · [spec.md](spec.md) · [research.md](research.md) · [data-model.md](data-model.md) · [contracts/mock-data-schema.md](contracts/mock-data-schema.md) · [quickstart.md](quickstart.md)

**Stack**: Next.js 14 · TypeScript 5 · React 18 · CSS Modules · `output: 'export'` (static)

**Tests**: Not included (not requested in spec). Manual validation via [quickstart.md](quickstart.md).

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story this task belongs to (US1, US2, US3)
- Every task includes an exact file path

---

## Phase 1: Setup

**Purpose**: Scaffold the Next.js project and configure static export

- [X] T001 Initialise Next.js 14 TypeScript project at the repository root using `npx create-next-app@14 . --typescript --app --src-dir --import-alias "@/*" --no-tailwind`
- [X] T002 Configure `next.config.js`: set `output: 'export'` and `images: { unoptimized: true }` for fully-static build *(after T001; parallel with T003–T004)*
- [X] T003 Verify `tsconfig.json` has `@/*` path alias mapping to `src/*`; add if missing *(after T001; parallel with T002, T004)*
- [X] T004 Create source directory scaffold: `src/components/layout/`, `src/components/sections/`, `src/components/form/`, `src/data/`, `src/types/` *(after T001; parallel with T002–T003)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, mock data, design tokens, and shared layout components that ALL user story phases depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Define TypeScript interfaces in `src/types/index.ts`: `SchoolInfo` (`name`, `tagline`, `description`, `highlights: string[]`), `CourseLevel`, `TeachingPair`, `Teacher`, `RegistrationFormState`, `FormErrors` — see [contracts/mock-data-schema.md](contracts/mock-data-schema.md) for other shapes
- [X] T006 Create embedded mock data in `src/data/mock.ts`: export `SCHOOL_INFO: SchoolInfo` (school name, tagline, one-paragraph description, `highlights` array with ≥ 3 value propositions — consumed by `HeroSection.tsx`); export `COURSE_LEVELS` (3 entries: beginner, intermediate, advanced, each with `id`, `name`, `nameLT`, `description`) and `TEACHERS` (5 entries, each with `id`, `name`, `bio`, `teaches: TeachingPair[]` covering ≥ 4 distinct combos, `startDates: string[]` with ≥ 2 ISO-8601 dates) — see [data-model.md](data-model.md) § Mock Data Minimum Requirements
- [X] T007 [P] Create `src/app/globals.css`: CSS custom properties for colour palette (`--color-primary`, `--color-text`, `--color-bg`, `--color-accent`, `--color-muted`), typography scale (`--font-size-*`), spacing tokens (`--space-*`), and a minimal box-sizing reset (FR-011)
- [X] T008 Create `src/app/layout.tsx`: root `<html lang="en">` / `<body>` shell, page `<title>` "Lithuanian Language School", `<meta name="description">`, import `globals.css`; replace any boilerplate left by create-next-app
- [X] T009 [P] Create `src/components/layout/SiteHeader.tsx` + `SiteHeader.module.css`: sticky `<header>` containing `<nav aria-label="Main navigation">` with anchor links to `#courses` and `#register`; uses CSS custom properties from `globals.css` (FR-013)
- [X] T010 [P] Create `src/components/layout/SiteFooter.tsx` + `SiteFooter.module.css`: `<footer>` with school contact information (email, phone — embedded strings) and a copyright line; semantic `<footer>` element (FR-013)

**Checkpoint**: Foundation ready — user story phases can now begin

---

## Phase 3: User Story 1 — Browse School & Courses (Priority: P1) 🎯 MVP

**Goal**: A visitor can open the landing page and learn about the school and all available course levels without interacting with any form.

**Independent Test**: Open `http://localhost:3000`. Verify school overview section with name, description, and ≥ 3 highlights is visible. Scroll to courses section and confirm exactly 3 level cards (Beginner, Intermediate, Advanced) are shown. Click the CTA button and confirm the page scrolls to the registration section. No form interaction required.

### Implementation for User Story 1

- [X] T011 [US1] Create `src/components/sections/HeroSection.tsx` + `HeroSection.module.css`: accepts a `school: SchoolInfo` prop; renders `<section>` with `school.name` as `<h1>`, `school.description` as a `<p>`, `school.highlights` as a `<ul>` (≥ 3 items), and a CTA `<a href="#register">` styled as a button (FR-001, FR-003)
- [X] T012 [P] [US1] Create `src/components/sections/CoursesSection.tsx` + `CoursesSection.module.css`: `<section id="courses">` with heading, maps over `COURSE_LEVELS` prop to render one card `<article>` per level showing `name`, `nameLT`, and `description` (FR-002)
- [X] T013 [P] [US1] Create `src/components/sections/RegistrationSection.tsx` + `RegistrationSection.module.css`: `<section id="register">` wrapper with heading "Register for a Course"; renders `{children}` so the form component can be slotted in during US2 (T021)
- [X] T014 [US1] Assemble `src/app/page.tsx`: render `SiteHeader` and `SiteFooter` as siblings of `<main>` (not inside it); inside `<main>` render `HeroSection` (pass `SCHOOL_INFO`), `CoursesSection` (pass `COURSE_LEVELS`), and `RegistrationSection` (with placeholder text); enforce heading hierarchy: `HeroSection` contains the page's only `<h1>`, `CoursesSection` and `RegistrationSection` use `<h2>` for section headings, course cards use `<h3>` (FR-013, WCAG 1.3.1)

**Checkpoint**: US1 complete — open page, verify school overview and 3 course cards visible, CTA scrolls to `#register` ✅

---

## Phase 4: User Story 2 — Complete Course Registration (Priority: P2)

**Goal**: A visitor can fill in all personal details, select levels, choose a teacher and start date, submit the form, and see a confirmation message. All required fields are validated before submission.

**Independent Test**: Open the registration form. Fill in first name, last name, a valid email, and a phone number. Select any current level and desired level (teacher list shows all teachers at this stage). Select any teacher and any date. Click Submit. Confirm the form is replaced by a confirmation message that includes the selected level, teacher, and date. Repeat with a field left blank and confirm submission is blocked with an error indicator.

### Implementation for User Story 2

- [X] T015 [US2] Create `src/components/form/PersonalInfoFields.tsx` + `PersonalInfoFields.module.css`: four labelled `<input>` elements (first name, last name, email, phone); accepts `values`, `onChange`, and `errors: FormErrors` props; renders inline `<span role="alert">` error text beneath each field when the matching `errors` entry is set (FR-004)
- [X] T016 [P] [US2] Create `src/components/form/LevelSelect.tsx` + `LevelSelect.module.css`: two labelled `<select>` elements ("Current level", "Desired level") populated from a `levels: CourseLevel[]` prop; each `<option>` shows `name (nameLT)`; accepts `currentValue`, `desiredValue`, `onCurrentChange`, `onDesiredChange` props (FR-005, FR-006)
- [X] T017 [P] [US2] Create `src/components/form/TeacherSelect.tsx` + `TeacherSelect.module.css`: labelled `<select>` accepting `availableTeachers: Teacher[]`, `value`, `onChange` props; renders one `<option>` per teacher showing `name`; renders a disabled placeholder `<option>` ("Select a teacher") when list is non-empty; when list is empty renders a `<p>` placeholder (to be extended in US3 T024) (FR-007)
- [X] T018 [P] [US2] Create `src/components/form/DateSelect.tsx` + `DateSelect.module.css`: labelled `<select>` accepting `availableDates: string[]`, `value`, `onChange` props; formats each ISO-8601 date to a human-readable string for display; renders a disabled placeholder `<option>` ("Select a start date") when list is non-empty; when list is empty renders an instructional placeholder (FR-008)
- [X] T019 [P] [US2] Create `src/components/form/ConfirmationMessage.tsx` + `ConfirmationMessage.module.css`: renders a `<div role="status">` containing a thank-you heading and a `<dl>` summary of `levelName`, `teacherName`, and `startDate` passed as props (FR-010)
- [X] T020 [US2] Implement `src/components/form/RegistrationForm.tsx` + `RegistrationForm.module.css`: `useReducer` managing all 8 `RegistrationFormState` fields and a `submitted` boolean; passes **all** `TEACHERS` to `TeacherSelect` and selected teacher's `startDates` to `DateSelect` (no filtering yet — added in US3); submit handler validates all required fields against rules in [data-model.md](data-model.md) § Validation Rules, sets `FormErrors`, and on full validity sets `submitted = true` to swap form for `ConfirmationMessage` (FR-009, FR-010)
- [X] T021 [US2] Replace placeholder in `src/components/sections/RegistrationSection.tsx`: import and render `<RegistrationForm />` inside the `<section id="register">` wrapper; remove placeholder text added in T013

**Checkpoint**: US2 complete — fill all fields and submit → confirmation message appears; leave a field blank and submit → error indicators shown, form stays ✅

> ⚠️ **Note**: At this checkpoint the teacher list is intentionally unfiltered (all teachers shown regardless of level selection). FR-007 dynamic filtering is deferred to Phase 5 (US3). Full spec compliance requires completing US3.

---

## Phase 5: User Story 3 — Dynamic Teacher & Date Selection (Priority: P3)

**Goal**: The form filters available teachers based on the selected level combination, and resets dependent selections on upstream changes. Edge cases (no matching teachers) are handled gracefully.

**Independent Test**: Select a current level and desired level → confirm teacher list shows only teachers covering that combination. Change either level → confirm teacher and date selections are cleared and teacher list updates. Select a teacher → confirm date list shows only that teacher's dates. Change the teacher → confirm date selection clears. Select a level combination with no matching teachers → confirm a friendly message appears and Submit is blocked.

### Implementation for User Story 3

- [X] T022 [US3] Extend `src/components/form/RegistrationForm.tsx` reducer: add `SET_LEVELS` action that filters `TEACHERS` (imported from `src/data/mock.ts`) by `(currentLevelId, desiredLevelId)` to derive `availableTeachers`, and resets `teacherId` and `startDate` to `""` on every level change; update `LevelSelect` `onCurrentChange` / `onDesiredChange` handlers to dispatch `SET_LEVELS` (FR-007, US3 AC 2–3)
- [X] T023 [US3] Extend `src/components/form/RegistrationForm.tsx` reducer: add `SET_TEACHER` action that sets `teacherId`, derives `availableDates` from the selected teacher's `startDates`, and resets `startDate` to `""`; update `TeacherSelect` `onChange` handler to dispatch `SET_TEACHER` (FR-008, US3 AC 3)
- [X] T024 [P] [US3] Extend `src/components/form/TeacherSelect.tsx`: add two conditional message states — (a) "Please select your current and desired levels first" when both level IDs are empty/unset; (b) "No teachers available for this combination — please choose another level." when level IDs are set but `availableTeachers` is empty; pass `currentLevelId` and `desiredLevelId` as props to enable this (US3 AC 1, AC 4, edge case)
- [X] T025 [US3] Extend `src/components/form/RegistrationForm.tsx` submit handler: add a guard that prevents submission and adds an entry to `FormErrors` when `availableTeachers` is empty, even if all other fields are filled; ensure `TeacherSelect` displays the inline error (edge case from spec § Edge Cases)

**Checkpoint**: US3 complete — all dynamic filtering, cascade resets, and edge-case messages work as described in spec US3 acceptance scenarios ✅

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, visual consistency, and final validation across all user stories

- [X] T026 Audit all components for semantic HTML and accessibility: verify `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>` are used; confirm every `<input>` and `<select>` has an associated `<label>`; add missing `aria-describedby`, `aria-required`, `aria-live` attributes; fix any `div`-only layouts; verify all normal text / background colour pairs defined in `src/app/globals.css` meet WCAG 1.4.3 contrast ratio ≥ 4.5:1 (FR-011, FR-013, SC-005, Constitution Principle IV)
- [X] T027 [P] Visual consistency pass across all `.module.css` files: replace any hard-coded colour, font, or spacing values with CSS custom properties from `src/app/globals.css`; verify typographic hierarchy and spacing rhythm are consistent throughout the page (FR-011)
- [X] T028 [P] Static export smoke test: run `npm run build`; confirm `out/` is generated with no build errors; serve with `npx serve out`; validate all 12 scenarios in `specs/001-language-school-landing/quickstart.md` pass against the production build
- [X] T029 [P] Keyboard navigation check: tab through the entire page from top; confirm focus order is logical (nav → hero CTA → form fields → submit); confirm all interactive elements show a visible focus indicator; confirm no focus traps exist outside the form (SC-005, FR-013)
- [X] T030 [P] Desktop layout verification: resize the browser to 1024 px width; confirm all sections are readable, all form fields are usable, and no horizontal scroll or overflow occurs; if content overflows, add `min-width: 1024px` on the root container in `src/app/globals.css` (FR-012)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS all user story phases**
- **Phase 3 (US1)**: Depends on Phase 2 completion
- **Phase 4 (US2)**: Depends on Phase 2 completion; integrates US1 sections from Phase 3
- **Phase 5 (US3)**: Depends on Phase 4 completion; extends `RegistrationForm.tsx` and `TeacherSelect.tsx`
- **Phase 6 (Polish)**: Depends on all desired user story phases being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependency on US2 or US3
- **US2 (P2)**: Can start after Phase 2 — integrates with US1 via `RegistrationSection` but US1 sections are independent
- **US3 (P3)**: Depends on US2 completion — extends `RegistrationForm.tsx` and `TeacherSelect.tsx` created in US2

### Within Each User Story

- Components with [P] (T011/T012/T013, T015/T016/T017/T018/T019) can be built simultaneously
- Assembly/integration tasks (T014, T020, T021) must come after their constituent components
- US3 tasks T022 and T023 are sequential (both modify `RegistrationForm.tsx`); T024 [P] can run alongside them (different file)

---

## Parallel Execution Examples

### Phase 2 — Foundational

```
T005 (types)
 └─► T006 (mock data — imports from types)
T007 (globals.css) ──── parallel with T005/T006
 └─► T008 (layout.tsx — imports globals.css)
T009 (SiteHeader) ──┐── parallel with each other and with T007/T008
T010 (SiteFooter) ──┘
```

### Phase 3 — User Story 1

```
T011 (HeroSection) ────┐
T012 (CoursesSection) ─┼── parallel with each other
T013 (RegistrationSection shell) ─┘
 └─► T014 (page.tsx assembles all three + header + footer)
```

### Phase 4 — User Story 2

```
T015 (PersonalInfoFields) ──┐
T016 (LevelSelect) ─────────┤
T017 (TeacherSelect) ───────┼── parallel with each other
T018 (DateSelect) ──────────┤
T019 (ConfirmationMessage) ─┘
 └─► T020 (RegistrationForm — wires all five)
      └─► T021 (RegistrationSection — slots in RegistrationForm)
```

### Phase 5 — User Story 3

```
T022 (SET_LEVELS reducer action)
 └─► T023 (SET_TEACHER reducer action — same file, extends T022 state shape)
T024 (TeacherSelect messages) ──── parallel with T022/T023 (different file)
T022 + T023 complete ──► T025 (blocked-submit guard in RegistrationForm)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only — 14 tasks)

1. Complete Phase 1: Setup (T001–T004)
2. Complete Phase 2: Foundational (T005–T010) — **critical gate**
3. Complete Phase 3: User Story 1 (T011–T014)
4. **STOP and VALIDATE**: open page, verify school overview + 3 course cards + CTA scroll
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → project boots, shared layout in place
2. US1 (T011–T014) → meaningful page, browsable course content (MVP ✅)
3. US2 (T015–T021) → registration form with validation and confirmation
4. US3 (T022–T025) → dynamic filtering, full spec compliance
5. Polish (T026–T029) → accessibility and quality gate before merge

---

## Notes

- `[P]` tasks operate on different files with no blocking dependencies — safe to work on simultaneously
- `[Story]` labels map each task to a user story for traceability against [spec.md](spec.md)
- Each user story phase ends with an explicit **Checkpoint** that mirrors the **Independent Test** in the spec — verify before advancing
- Commit after each task or logical group (e.g., after all [P] tasks in a phase complete)
- The form has no backend: `RegistrationForm.tsx` simulates submission entirely in client state
- All file paths are relative to the repository root
