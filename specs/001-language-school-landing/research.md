# Phase 0 Research: Lithuanian Language School Landing Page

**Feature**: `001-language-school-landing`
**Date**: 2026-06-29
**Status**: Complete — no NEEDS CLARIFICATION items remain

---

## Research Inputs

The user specified upfront:
- Framework: **Next.js with static site configuration**
- Storage: **No database — data embedded in content (mock)**

The spec assumptions confirm: all data is embedded; form submission is simulated; no backend required for v1.

The remaining unknowns for research were:
1. App Router vs Pages Router for a single-page static export
2. Form state management strategy (multi-field dependent form)
3. Styling approach compatible with Next.js and the constitution
4. Static export configuration specifics for Next.js 14

---

## Decision 1 — Next.js App Router vs Pages Router

**Decision**: Use Next.js 14 **App Router** (`src/app/`)

**Rationale**:
- App Router is the default in Next.js 13+ and the direction of the framework. Using it now avoids a future migration.
- `output: 'export'` works fully with App Router in Next.js 14: `next build` generates a static `out/` directory with no server dependency.
- A single `app/page.tsx` (the landing page) plus `app/layout.tsx` (root HTML shell) is all that's required — minimal overhead.
- The "no new URL on navigation" requirement from the spec is satisfied by in-page anchor links, which work identically in both routers.

**Alternatives considered**:
- *Pages Router (`pages/index.tsx`)* — fully viable for a single-page site and arguably simpler, but App Router is the current default and avoids a deprecated pattern in new projects.

---

## Decision 2 — Form State Management

**Decision**: `useReducer` in a single `RegistrationForm.tsx` controller component

**Rationale**:
- The registration form has 8 fields and 2 derived lists (available teachers, available dates) that update in response to other field changes.
- `useReducer` consolidates all transitions (field update, teacher reset on level change, date reset on teacher change, submission) in one place and makes the logic easy to test.
- Cascading resets (level change → clear teacher + date; teacher change → clear date) are cleanly expressed as reducer cases.
- No external state management library (Redux, Zustand, Jotai) is needed; that would violate the YAGNI principle (Constitution III).

**Alternatives considered**:
- *Multiple `useState` calls* — works for simple forms but becomes error-prone for the cascading-reset logic with 8+ fields.
- *React Hook Form / Formik* — valid for large form-heavy apps but an unjustified dependency for a single mock form (Constitution III).

---

## Decision 3 — Styling Approach

**Decision**: **CSS Modules** per component + a single `src/app/globals.css` for CSS custom properties

**Rationale**:
- CSS Modules are built into Next.js (zero configuration) and provide class name scoping without a build-time dependency.
- `globals.css` holds the design system: colour palette as CSS custom properties (`--color-primary`, `--color-text`, etc.), typography scale, and base reset. This satisfies Constitution Principle V ("CSS variables for theming").
- Per-component `.module.css` files keep styles co-located with their component and prevent global class collisions.
- No CSS-in-JS library (styled-components, Emotion) is needed — that would be an unjustified dependency.

**Alternatives considered**:
- *Single flat stylesheet* — constitution permits this for plain static pages, but CSS Modules is the idiomatic Next.js approach and provides better maintainability for a multi-component page.
- *Tailwind CSS* — popular but adds a PostCSS build step and requires configuration; unjustified for a single landing page.

---

## Decision 4 — Static Export Configuration

**Decision**: Set `output: 'export'` and `images: { unoptimized: true }` in `next.config.js`

**Rationale**:
- `output: 'export'` makes `next build` generate a fully-static `out/` directory: plain HTML, CSS, and JS that can be served by any static host (Nginx, GitHub Pages, Netlify, etc.) with no Node.js runtime.
- `images.unoptimized: true` is required because Next.js Image Optimization uses a server-side API that is unavailable in static export mode. Setting this flag tells Next.js to skip optimization and serve images as-is.
- No `next start` is needed — `npx serve out` (or any static file server) is sufficient for local validation.

**Alternatives considered**:
- *`next export` command (legacy)* — deprecated in Next.js 14; `output: 'export'` in config is the current approach.
- *SSG with `getStaticProps`* — only relevant for Pages Router; App Router uses React Server Components for the same purpose.

---

## Decision 5 — Embedded Mock Data Structure

**Decision**: TypeScript **`const` arrays** in `src/data/mock.ts`, typed against interfaces in `src/types/index.ts`

**Rationale**:
- Exporting `COURSE_LEVELS: CourseLevel[]` and `TEACHERS: Teacher[]` as named constants makes the data tree-shakable and easy to replace with a real API call in the future (same interface, different data source).
- Keeping types in a separate `types/index.ts` file means components import only the type, not the data, which avoids circular dependencies and keeps the type surface explicit.
- No JSON files — TypeScript constants give autocomplete and type-checking during development.

**Alternatives considered**:
- *JSON files imported as modules* — simpler but loses TypeScript type safety on the raw JSON.
- *Hardcoded JSX data* — difficult to reuse across components and impossible to filter programmatically.

---

## Summary of Resolved Unknowns

| Unknown | Resolution |
|---------|-----------|
| Router strategy | App Router (`src/app/`) |
| Form state | `useReducer` in `RegistrationForm.tsx` |
| Styling | CSS Modules + `globals.css` with CSS custom properties |
| Static export | `output: 'export'`, `images.unoptimized: true` |
| Mock data format | TypeScript `const` arrays with explicit interfaces |

All unknowns resolved. No NEEDS CLARIFICATION items remain. Ready for Phase 1.
