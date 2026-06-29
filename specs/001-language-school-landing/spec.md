# Feature Specification: Lithuanian Language School Landing Page

**Feature Branch**: `001-language-school-landing`

**Created**: 2026-06-26

**Status**: Draft

**Input**: User description: "A landing page for a Lithuanian language school where users can learn about available Lithuanian courses and register for a group course."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browse School & Courses (Priority: P1)

A prospective student visits the landing page to learn about the school and understand what Lithuanian language courses are offered before deciding to register.

**Why this priority**: This is the core value of a landing page — informing visitors. It must work independently of the registration flow and serves as the entry point for all users.

**Independent Test**: Can be fully tested by opening the page and verifying that the school's overview section and all three course levels (Beginner, Intermediate, Advanced) are visible and readable, without interacting with any form.

**Acceptance Scenarios**:

1. **Given** a visitor opens the landing page, **When** the page loads, **Then** a school overview section is displayed with the school name, a brief description, and key highlights.
2. **Given** a visitor views the courses section, **When** they scroll to it, **Then** they see at least three course levels (e.g., Beginner, Intermediate, Advanced), each with a name and short description.
3. **Given** a visitor wants to start registering, **When** they click a call-to-action button, **Then** they are taken to or shown the registration form.

---

### User Story 2 — Complete Course Registration (Priority: P2)

A prospective student fills in their personal details, selects their current and desired course level, chooses a teacher and start date, and submits the registration form.

**Why this priority**: Registration is the primary conversion goal of the page. Without it the landing page has no actionable outcome.

**Independent Test**: Can be fully tested by opening the registration form, filling in all required fields, submitting, and confirming a success message appears — all without a real backend.

**Acceptance Scenarios**:

1. **Given** the registration form is open, **When** the user fills in their first name, last name, email address, and phone number, **Then** all fields accept valid input.
2. **Given** the personal information is filled in, **When** the user selects their current Lithuanian level and desired course level, **Then** a list of available teachers for that combination is displayed.
3. **Given** a teacher is selected, **When** the user views the date section, **Then** available course start dates for that teacher are displayed and one can be selected.
4. **Given** all required fields are completed, **When** the user submits the form, **Then** the form disappears and a confirmation message is shown thanking the user and summarising their selection.
5. **Given** the form is submitted with one or more required fields empty, **When** the user attempts submission, **Then** the empty fields are highlighted and submission is blocked.

---

### User Story 3 — Dynamic Teacher & Date Selection (Priority: P3)

The form intelligently narrows available teachers and start dates based on the student's level selections, preventing mismatches and guiding the user toward valid options.

**Why this priority**: Improves user experience and data quality, but the form can function without this if teachers/dates were a flat list. It is an enhancement on top of the core registration flow.

**Independent Test**: Can be tested by selecting different combinations of current/desired levels and verifying that the teacher list updates each time, and that changing the teacher updates the available dates.

**Acceptance Scenarios**:

1. **Given** the user has not yet selected a current or desired level, **When** they view the teacher field, **Then** the teacher list is empty or shows a prompt to select levels first.
2. **Given** the user selects a current level and a desired course level, **When** the selection changes, **Then** the teacher list refreshes to show only teachers who teach that combination.
3. **Given** the user selects a teacher, **When** the teacher changes, **Then** the start date list resets and shows only dates available for the newly selected teacher.
4. **Given** the user changes their level selection after already choosing a teacher, **When** the new level combination has no matching teachers, **Then** a friendly message is displayed (e.g., "No teachers available for this combination — please choose another level.").

---

### Edge Cases

- What happens when a level combination has no available teachers? → A friendly inline message is shown; submission is blocked until a valid selection is made.
- What happens if the user submits with missing required fields? → Required fields are highlighted with error indicators; form is not submitted.
- What happens if the user changes their level after selecting a teacher and start date? → Both teacher and start date selections are cleared and the user must re-select.
- What if JavaScript is disabled? → The form fields remain visible but dynamic filtering does not work; a static fallback message ("Please enable JavaScript for the best experience") is shown.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST display a school overview section with the school name, a short description, and at least three key highlights or value propositions.
- **FR-002**: The page MUST display a courses section listing available levels (at minimum: Beginner, Intermediate, Advanced), each with a name and a brief description.
- **FR-003**: The page MUST include a prominent call-to-action that opens or scrolls to the registration form.
- **FR-004**: The registration form MUST collect: first name, last name, email address, and phone number as required fields.
- **FR-005**: The registration form MUST include a dropdown or selector for the user's current Lithuanian language level.
- **FR-006**: The registration form MUST include a dropdown or selector for the desired course/group level.
- **FR-007**: The registration form MUST dynamically display available teachers based on the combination of current level and desired course level selected.
- **FR-008**: After a teacher is selected, the form MUST display available course start dates specific to that teacher.
- **FR-009**: The user MUST be able to submit the completed form; all required fields must be validated before submission is allowed.
- **FR-010**: After successful form submission, the user MUST see a confirmation message that includes a summary of their chosen course level, teacher, and start date.
- **FR-011**: The page MUST present a sleek, modern visual design with consistent typography, colour palette, and spacing throughout.
- **FR-012**: The page MUST be usable on desktop screen size.
- **FR-013**: All major page sections (navigation, hero/header, course listings, registration form, footer) MUST be clearly distinguishable and navigable by assistive technologies.

### Key Entities *(include if feature involves data)*

- **Course Level**: A named proficiency tier (e.g., Beginner, Intermediate, Advanced) with a display name and short description. Used both as "current level" and "desired course level".
- **Teacher**: A person who teaches one or more course level combinations; has a name and is associated with one or more (current level → desired level) pairings.
- **Course Start Date**: A specific date on which a course led by a particular teacher begins; linked to a teacher.
- **Registration**: A record of a prospective student's submitted form; contains personal details, selected current level, desired level, teacher, and start date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new visitor can locate the registration form and submit a complete registration in under 3 minutes from page load.
- **SC-002**: The teacher list and start date list update immediately upon level/teacher selection, with no perceptible delay or page reload.
- **SC-003**: 100% of form submissions with missing required fields are blocked, and the user receives clear feedback identifying which fields need attention.
- **SC-004**: A confirmation message is displayed to the user within 1 second of a successful form submission.
- **SC-005**: All major page sections (school overview, courses, registration form) are reachable via keyboard navigation alone.

## Assumptions

- All data (course levels, teachers, available start dates) is embedded within the page itself; no live data source, external database, or third-party API is required.
- Form submission is simulated: on submit, the page presents a confirmation message without transmitting data to any server. Real backend integration is out of scope for v1.
- The primary language of the UI is English; Lithuanian course/level names may appear alongside English equivalents (e.g., "Beginner / Pradedantysis").
- At least three teachers and at least two start dates per teacher are defined in the embedded data so that the dynamic selection experience is meaningful.
- The entire experience is contained within a single page; navigating between sections does not load a new URL or require a page reload.
- No payment processing, scheduling backend, or user account creation is included in v1.
- Browser support follows the project constitution: last 2 major versions of Chrome, Firefox, and Safari.
