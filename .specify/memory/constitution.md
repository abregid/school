# Static Web App Constitution

## Core Principles

### I. No Build Step (unless Next.js)
Plain HTML, CSS, and vanilla JavaScript by default. No bundlers, transpilers, or frameworks unless Next.js is the chosen stack for a feature. If Next.js is used, its build toolchain (`next build` / `next dev`) is the approved exception. Any other build tool still requires documented justification.

### II. Single Responsibility Pages
Each HTML file represents one distinct page or view. Shared logic lives in dedicated `.js` files loaded via `<script>` tags. No inline scripts longer than 5 lines.

### III. Simplicity First (YAGNI)
Add only what is needed for the current requirement. No premature abstractions, utility libraries, or external dependencies unless strictly necessary. Prefer native browser APIs.

### IV. Accessible by Default
All pages must be navigable by keyboard and pass basic WCAG 2.1 AA checks. Semantic HTML elements (`<nav>`, `<main>`, `<header>`, `<footer>`, etc.) are required. No `div`-only layouts.

### V. Static & Self-Contained
No server-side rendering, no backend required to serve the app. All assets (fonts, icons, images) must either be local or loaded from a stable CDN with a pinned version.

## Tech Stack & Constraints

- **Languages**: HTML5, CSS3, JavaScript (ES2020+)
- **Styling**: Plain CSS or a single flat stylesheet per page; CSS variables for theming
- **Frameworks**: Next.js is permitted. All other frameworks (Vue, Angular, Svelte, etc.) are not permitted without a documented amendment.
- **Package managers**: `package.json`, `node_modules`, and lock files are allowed when Next.js is used. For plain static pages, no package manager is required.
- **External deps**: Allowed only via CDN with a pinned version and an integrity hash (`integrity` + `crossorigin` attributes required)
- **Browser support**: Last 2 major versions of Chrome, Firefox, and Safari

## Development Workflow

- **Local dev**: App runs on `localhost`. For plain static pages, use any static file server (e.g., `python3 -m http.server` at `http://localhost:8000`, or VS Code Live Server). For Next.js features, use `next dev` (defaults to `http://localhost:3000`).
- **File structure**: `index.html` at root; assets in `/assets`; scripts in `/scripts`; styles in `/styles`
- **Validation**: HTML must pass W3C validation before merge; CSS must have no unknown properties
- **No minification required** for source files; keep code readable

## Governance

This constitution supersedes all other practices. Any deviation requires a documented reason added as an amendment below. Complexity must be justified against user value — when in doubt, do less.

**Version**: 1.1.0 | **Ratified**: 2026-06-26 | **Last Amended**: 2026-06-29

### Amendment A1 — Next.js Permitted (2026-06-29)
Next.js is approved as an exception to the No Build Step principle. Its React/Node.js toolchain is accepted for features where SSR, file-based routing, or the Next.js ecosystem provides clear user value. All other framework restrictions remain in force.
