# Implementation Plan: Lithuanian Language School Landing Page

**Branch**: `001-language-school-landing` | **Date**: 2026-06-29 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-language-school-landing/spec.md`

## Summary

Build a single-page, fully-static Next.js landing page for a Lithuanian language school. The page presents a school overview, three course levels (Beginner, Intermediate, Advanced), and an interactive registration form with dynamic teacher and start-date filtering. All data (course levels, teachers, start dates) is embedded as TypeScript constants in `src/data/mock.ts`. Form submission is simulated client-side with a confirmation message — no backend required.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20 LTS

**Primary Dependencies**: Next.js 14 (static export via `output: 'export'`), React 18; no additional runtime dependencies beyond the Next.js ecosystem

**Storage**: N/A — all course levels, teachers, and start-date data embedded as TypeScript constants in `src/data/mock.ts`

**Testing**: Jest + React Testing Library (unit/component); manual browser validation per [quickstart.md](quickstart.md) for end-to-end scenarios

**Target Platform**: Web browser — desktop (last 2 major versions of Chrome, Firefox, Safari per spec and constitution)

**Project Type**: Static web application — single landing page, Next.js static export (`out/` directory, deployable to any static host)

**Performance Goals**: First Contentful Paint < 1.5 s on fast-3G; dynamic teacher/date filtering with zero perceptible delay (pure in-memory filtering, no network calls)

**Constraints**: `output: 'export'` in `next.config.js` — no SSR, no server actions, no API routes at runtime; no external APIs; no database; offline-capable after first load; minimum supported viewport width 1024 px (desktop-only, FR-012)

**Scale/Scope**: One page; 5 embedded teachers, 3 course levels, ≥ 2 start dates per teacher

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result | Notes |
|-----------|-------|--------|-------|
| I — No Build Step (unless Next.js) | Next.js build toolchain used | ✅ PASS | Approved via Amendment A1 |
| II — Single Responsibility Pages | One `page.tsx`; each component has one concern | ✅ PASS | |
| III — Simplicity First (YAGNI) | React `useState`/`useReducer` only; no state library | ✅ PASS | Interactive form justifies React |
| IV — Accessible by Default | Semantic HTML required; WCAG 2.1 AA per FR-013, SC-005 | ✅ PASS | Must be verified during implementation |
| V — Static & Self-Contained | `output: 'export'`; all data embedded; no backend | ✅ PASS | |
| Browser support | Last 2 major Chrome, Firefox, Safari | ✅ PASS | Matches spec Assumptions |

**Post-Phase-1 re-check**: No violations introduced by design — no external runtime services, no unapproved frameworks, no persistent storage.

No violations — Complexity Tracking table not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-language-school-landing/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── mock-data-schema.md  ← Phase 1 output: embedded data contract
└── tasks.md             ← Phase 2 output (not created by /speckit.plan)
```

### Source Code (repository root)

```text
/                              ← Next.js project root
├── next.config.js             ← output: 'export', images.unoptimized: true
├── package.json
├── tsconfig.json
├── public/
│   └── (static assets: logo, images, favicon)
└── src/
    ├── app/
    │   ├── layout.tsx         ← root layout: <html>, <body>, global metadata
    │   ├── page.tsx           ← single landing page (assembles all sections)
    │   └── globals.css        ← CSS custom properties (palette, typography, spacing), reset
    ├── components/
    │   ├── layout/
    │   │   ├── SiteHeader.tsx ← sticky nav with anchor links
    │   │   └── SiteFooter.tsx ← school contact info / copyright
    │   ├── sections/
    │   │   ├── HeroSection.tsx        ← school name, tagline, CTA button (FR-001, FR-003)
    │   │   ├── CoursesSection.tsx     ← three level cards (FR-002)
    │   │   └── RegistrationSection.tsx ← section wrapper + heading, renders RegistrationForm
    │   └── form/
    │       ├── RegistrationForm.tsx   ← useReducer controller, all form state lives here
    │       ├── PersonalInfoFields.tsx ← first name, last name, email, phone (FR-004)
    │       ├── LevelSelect.tsx        ← current + desired level dropdowns (FR-005, FR-006)
    │       ├── TeacherSelect.tsx      ← filtered teacher list (FR-007)
    │       ├── DateSelect.tsx         ← filtered start dates (FR-008)
    │       └── ConfirmationMessage.tsx ← post-submit summary (FR-010)
    ├── data/
    │   └── mock.ts            ← exported COURSE_LEVELS, TEACHERS constants (see data-model.md)
    └── types/
        └── index.ts           ← CourseLevel, Teacher, TeachingPair, RegistrationFormState
```

**Structure Decision**: Next.js 14 App Router (`src/app/`) is the convention default and works cleanly with `output: 'export'`. Components are split into `layout/`, `sections/`, and `form/` sub-directories for clear domain separation. `src/data/mock.ts` is the single source of truth for all embedded data.
