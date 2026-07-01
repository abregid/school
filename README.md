# Lithuanian Language School — Landing Page

A fully static, single-page landing site for a Lithuanian language school. Visitors can browse available course levels and register for a group course using an interactive form with dynamic teacher and start-date filtering. No backend required — all data is embedded as TypeScript constants.

---

## Features

- **School overview** — hero section with school name, tagline, and call-to-action
- **Course catalogue** — Beginner, Intermediate, and Advanced level cards
- **Registration form** — personal info, level selection, dynamically filtered teachers and start dates, and a confirmation message on submission
- **Static export** — deployable to any static host (Vercel, Netlify, GitHub Pages, etc.)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (`output: 'export'`) |
| UI | React 18 |
| Language | TypeScript 5 |
| Styling | CSS Modules |
| Testing | [Playwright](https://playwright.dev/) |
| Node | 20 LTS |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (metadata, global styles)
│   ├── page.tsx            # Single landing page — assembles all sections
│   └── globals.css         # CSS custom properties, palette, typography, reset
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx  # Sticky nav with anchor links
│   │   └── SiteFooter.tsx  # Contact info / copyright
│   ├── sections/
│   │   ├── HeroSection.tsx          # School name, tagline, CTA
│   │   ├── CoursesSection.tsx       # Three course-level cards
│   │   └── RegistrationSection.tsx  # Section wrapper for the form
│   └── form/
│       ├── RegistrationForm.tsx     # useReducer controller, all form state
│       ├── PersonalInfoFields.tsx   # First name, last name, email, phone
│       ├── LevelSelect.tsx          # Current + desired level dropdowns
│       ├── TeacherSelect.tsx        # Dynamically filtered teacher list
│       ├── DateSelect.tsx           # Dynamically filtered start dates
│       └── ConfirmationMessage.tsx  # Post-submit summary
├── data/
│   └── mock.ts             # Embedded COURSE_LEVELS and TEACHERS constants
└── types/
    └── index.ts            # CourseLevel, Teacher, RegistrationFormState types
specs/
└── 001-language-school-landing/    # Full spec, plan, data model, test plan
tests/
├── browseCourses.spec.ts           # Playwright — User Story 1
├── courseRegistration.spec.ts      # Playwright — User Story 2
└── dynamicSelection.spec.ts        # Playwright — User Story 3
```

---

## Getting Started

### Prerequisites

- Node.js 20 LTS (`node --version`)
- npm ≥ 10 (`npm --version`)

### Install & Run

```bash
npm install
npm run dev
# → http://localhost:3000
```

### Build (Static Export)

```bash
npm run build
# → Generates the static site in out/

npx serve out
# → Preview the production build locally
```

### Run Tests

```bash
npx playwright install   # first time only
npx playwright test
```

---

## How This Project Was Created

This project was built using **[SpecKit](https://marketplace.visualstudio.com/items?itemName=gitlab.gitlab-duo-workflow)** — a spec-driven development workflow powered by **GitHub Copilot** inside VS Code.

### The SpecKit workflow

1. **`/speckit.specify`** — Copilot interviewed the developer, then generated a structured feature specification (`specs/001-language-school-landing/spec.md`) covering user stories, acceptance criteria, functional requirements, and constraints.

2. **`/speckit.plan`** — Copilot analysed the spec and produced an implementation plan (`specs/001-language-school-landing/plan.md`) with a technical context, architecture decisions, project structure, and a task breakdown.

3. **`/speckit.implement`** — Copilot executed the plan task-by-task, creating every source file, component, and data constant in the repository.

All specification artefacts live under `specs/001-language-school-landing/` and serve as the single source of truth for requirements, data contracts, and validation scenarios.
