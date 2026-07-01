# Test Cases: Lithuanian Language School Landing Page

**Feature**: `001-language-school-landing`  
**Spec reference**: [spec.md](spec.md) · **Test plan reference**: [test-plan.md](test-plan.md)  
**Date**: 2026-07-01  
**Total automated tests**: 51 (15 + 19 + 17)

---

## Contents

1. [Suite 1 — Browse School & Courses](#suite-1--browse-school--courses)
2. [Suite 2 — Complete Course Registration](#suite-2--complete-course-registration)
3. [Suite 3 — Dynamic Teacher & Date Selection](#suite-3--dynamic-teacher--date-selection)

---

## Shared Preconditions

All test cases in every suite share the following preconditions unless stated otherwise.

| # | Precondition |
|---|---|
| P-1 | The application has been built (`npm run build`) without errors. |
| P-2 | The dev/static server is running and accessible at `http://localhost:3000`. |
| P-3 | A Chromium browser (1280 × 720 viewport) is launched with JavaScript enabled. |
| P-4 | The browser navigates to `http://localhost:3000` before each test. |
| P-5 | No cookies, local-storage state, or service-worker caches are carried between tests. |

---

## Test Data Reference

| Constant | Value |
|---|---|
| `VALID_USER.firstName` | `Anna` |
| `VALID_USER.lastName` | `Smith` |
| `VALID_USER.email` | `anna.smith@example.com` |
| `VALID_USER.phone` | `+370 600 12345` |
| `INVALID_EMAIL_USER.email` | `not-an-email` |
| `INVALID_PHONE_USER.phone` | `abc@!#` |
| Happy-path combo | `beginner → intermediate` |
| Happy-path teacher | `ruta-kazlauskaite` (Rūta Kazlauskaitė) |
| Happy-path start date | `2026-08-03` → displayed as **3 August 2026** |
| `CONFIRMATION.levelName` | `Intermediate` |
| `CONFIRMATION.teacherName` | `Rūta Kazlauskaitė` |
| `CONFIRMATION.startDate` | `3 August 2026` |

### Teachers by level combination

| Combo key | Teacher names |
|---|---|
| `beginner→beginner` | Rūta Kazlauskaitė, Viktorija Stankevičienė |
| `beginner→intermediate` | Rūta Kazlauskaitė, Eglė Paulauskaitė |
| `intermediate→intermediate` | Tomas Bernatas, Viktorija Stankevičienė |
| `intermediate→advanced` | Tomas Bernatas, Mindaugas Jurgaitis |
| `advanced→advanced` | Eglė Paulauskaitė, Mindaugas Jurgaitis |

### Zero-match level combinations

| Current level | Desired level |
|---|---|
| beginner | advanced |
| advanced | beginner |
| advanced | intermediate |
| intermediate | beginner |

### Start dates by teacher

| Teacher ID | Dates |
|---|---|
| `ruta-kazlauskaite` | 2026-08-03, 2026-09-07 |
| `tomas-bernotas` | 2026-07-14, 2026-08-18, 2026-10-06 |
| `egle-paulauskaite` | 2026-07-21, 2026-09-14 |
| `mindaugas-jurgaitis` | 2026-08-10, 2026-10-12 |
| `viktorija-stankeviciene` | 2026-07-07, 2026-08-25, 2026-11-03 |

---

## Suite 1 — Browse School & Courses

**File**: `tests/browseCourses.spec.ts`  
**User Story**: US1 (Priority P1)  
**Pass criteria**: All 15 tests green. Page loads without errors. All three course cards present.

---

### TC-S1-001 · `US1-AC1-01` — School name is displayed as the main heading

| Field | Detail |
|---|---|
| **ID** | TC-S1-001 |
| **Test ID** | `US1-AC1-01` |
| **Requirement** | FR-001 |
| **Acceptance Criteria** | US1-AC1 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Locate the `<h1>` element on the page.

**Expected result**

- The `<h1>` element is visible.
- Its text content contains **"Lietuvių Kalba"**.

---

### TC-S1-002 · `US1-AC1-02` — School description paragraph is visible

| Field | Detail |
|---|---|
| **ID** | TC-S1-002 |
| **Test ID** | `US1-AC1-02` |
| **Requirement** | FR-001 |
| **Acceptance Criteria** | US1-AC1 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Locate the school description paragraph element.

**Expected result**

- The description paragraph is visible.
- Its text content contains at least 20 non-whitespace characters.

---

### TC-S1-003 · `US1-AC1-03` — At least three school highlights are listed

| Field | Detail |
|---|---|
| **ID** | TC-S1-003 |
| **Test ID** | `US1-AC1-03` |
| **Requirement** | FR-001 |
| **Acceptance Criteria** | US1-AC1 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Count the school highlight items in the hero section.

**Expected result**

- At least **3** highlight items are visible on the page.

---

### TC-S1-004 · `US1-AC2-01` — Courses section heading is visible after scroll

| Field | Detail |
|---|---|
| **ID** | TC-S1-004 |
| **Test ID** | `US1-AC2-01` |
| **Requirement** | FR-002 |
| **Acceptance Criteria** | US1-AC2 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Scroll the courses section into view.

**Expected result**

- The courses section heading is visible in the viewport.

---

### TC-S1-005 · `US1-AC2-02` — Exactly three course-level cards are displayed

| Field | Detail |
|---|---|
| **ID** | TC-S1-005 |
| **Test ID** | `US1-AC2-02` |
| **Requirement** | FR-002 |
| **Acceptance Criteria** | US1-AC2 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Scroll the courses section into view.
3. Count all course-level card elements.

**Expected result**

- Exactly **3** course-level cards are rendered.

---

### TC-S1-006 · `US1-AC2-03` — Each course card is visible with a non-empty description

| Field | Detail |
|---|---|
| **ID** | TC-S1-006 |
| **Test ID** | `US1-AC2-03` |
| **Requirement** | FR-002 |
| **Acceptance Criteria** | US1-AC2 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps** *(repeat for each level: Beginner, Intermediate, Advanced)*

1. Open `http://localhost:3000`.
2. Scroll the courses section into view.
3. Locate the card for the given level name.
4. Locate the last `<p>` element inside the card.

**Expected result**

- Each card is visible.
- The description `<p>` inside each card is not empty (contains text).

**Test data**: `COURSE_LEVELS` = `[{ name: 'Beginner' }, { name: 'Intermediate' }, { name: 'Advanced' }]`

---

### TC-S1-007 · `US1-AC2-04` — Each course card shows its Lithuanian name

| Field | Detail |
|---|---|
| **ID** | TC-S1-007 |
| **Test ID** | `US1-AC2-04` |
| **Requirement** | FR-002 |
| **Acceptance Criteria** | US1-AC2 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps** *(repeat for each level)*

1. Open `http://localhost:3000`.
2. Scroll the courses section into view.
3. Locate the card matching the English level name.
4. Look for the Lithuanian name text within the card.

**Expected result**

| English name | Lithuanian name expected |
|---|---|
| Beginner | Pradedantysis |
| Intermediate | Pažengęs |
| Advanced | Aukštesnis |

Each Lithuanian name is visible inside the corresponding card.

---

### TC-S1-008 · `US1-AC3-01` — Hero CTA scrolls page to the registration section

| Field | Detail |
|---|---|
| **ID** | TC-S1-008 |
| **Test ID** | `US1-AC3-01` |
| **Requirement** | FR-003 |
| **Acceptance Criteria** | US1-AC3 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Click the primary CTA button in the hero section.

**Expected result**

- The registration section is scrolled into view.
- At least **50 %** of the registration section is visible in the viewport.

---

### TC-S1-009 · `US1-AC3-02` — "Register for a Course" heading is visible in the registration section

| Field | Detail |
|---|---|
| **ID** | TC-S1-009 |
| **Test ID** | `US1-AC3-02` |
| **Requirement** | FR-003 |
| **Acceptance Criteria** | US1-AC3 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Click the primary CTA button in the hero section.

**Expected result**

- The heading **"Register for a Course"** (or equivalent) is visible.

---

### TC-S1-010 · `US1-NAV-01` — Site header and logo are visible

| Field | Detail |
|---|---|
| **ID** | TC-S1-010 |
| **Test ID** | `US1-NAV-01` |
| **Requirement** | FR-013 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.

**Expected result**

- The `<header>` element is visible.
- The logo element inside the header is visible.

---

### TC-S1-011 · `US1-NAV-02` — Main navigation contains "Courses" and "Register" links

| Field | Detail |
|---|---|
| **ID** | TC-S1-011 |
| **Test ID** | `US1-NAV-02` |
| **Requirement** | FR-013 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Locate the main navigation bar.

**Expected result**

- A **"Courses"** navigation link is visible.
- A **"Register"** navigation link is visible.

---

### TC-S1-012 · `US1-NAV-03` — "Courses" nav link scrolls to the courses section

| Field | Detail |
|---|---|
| **ID** | TC-S1-012 |
| **Test ID** | `US1-NAV-03` |
| **Requirement** | FR-013 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Click the **"Courses"** navigation link.

**Expected result**

- The courses section is scrolled into view.
- At least **50 %** of the courses section is visible in the viewport.

---

### TC-S1-013 · `US1-NAV-04` — "Register" nav link scrolls to the registration section

| Field | Detail |
|---|---|
| **ID** | TC-S1-013 |
| **Test ID** | `US1-NAV-04` |
| **Requirement** | FR-013 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Click the **"Register"** navigation link.

**Expected result**

- The registration section is scrolled into view.
- At least **50 %** of the registration section is visible in the viewport.

---

### TC-S1-014 · `US1-NAV-05` — Site footer is visible

| Field | Detail |
|---|---|
| **ID** | TC-S1-014 |
| **Test ID** | `US1-NAV-05` |
| **Requirement** | FR-013 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Scroll the footer into view.

**Expected result**

- The `<footer>` element is visible.

---

### TC-S1-015 · `US1-A11Y-01` — Logo and nav links are reachable via keyboard Tab

| Field | Detail |
|---|---|
| **ID** | TC-S1-015 |
| **Test ID** | `US1-A11Y-01` |
| **Requirement** | FR-013 |
| **Success Criteria** | SC-005 |
| **Priority** | P1 |

**Preconditions**: Shared preconditions P-1 – P-5. Page is loaded. No element is focused.

**Steps**

1. Open `http://localhost:3000`.
2. Press **Tab** once.
3. Check which element has focus.
4. Press **Tab** a second time.
5. Check which element has focus.
6. Press **Tab** a third time.
7. Check which element has focus.

**Expected result**

| Tab press | Focused element |
|---|---|
| 1st | Logo link |
| 2nd | "Courses" nav link |
| 3rd | "Register" nav link |

All three elements receive visible keyboard focus in the order above.

---

## Suite 2 — Complete Course Registration

**File**: `tests/courseRegistration.spec.ts`  
**User Story**: US2 (Priority P2)  
**Pass criteria**: All 19 tests green. Confirmation appears in ≤ 1 s. Zero full-page navigations during dynamic updates.

---

### TC-S2-001 · `US2-AC1-01` — All personal info fields accept valid input

| Field | Detail |
|---|---|
| **ID** | TC-S2-001 |
| **Test ID** | `US2-AC1-01` |
| **Requirement** | FR-004 |
| **Acceptance Criteria** | US2-AC1 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5. Browser is on the registration form.

**Steps**

1. Fill **First Name** with `Anna`.
2. Fill **Last Name** with `Smith`.
3. Fill **Email** with `anna.smith@example.com`.
4. Fill **Phone** with `+370 600 12345`.

**Expected result**

- Each field holds the exact value that was entered.
- No validation errors are shown.

---

### TC-S2-002 · `US2-AC2-01` — Selecting levels enables the teacher dropdown

| Field | Detail |
|---|---|
| **ID** | TC-S2-002 |
| **Test ID** | `US2-AC2-01` |
| **Requirement** | FR-005, FR-006, FR-007 |
| **Acceptance Criteria** | US2-AC2 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.

**Expected result**

- The **Teacher** dropdown becomes enabled (not disabled).

---

### TC-S2-003 · `US2-AC2-02` — Teacher list contains correct names for beginner→intermediate

| Field | Detail |
|---|---|
| **ID** | TC-S2-003 |
| **Test ID** | `US2-AC2-02` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US2-AC2 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Read all options in the Teacher dropdown.

**Expected result**

- The teacher dropdown contains exactly **2** options: `Rūta Kazlauskaitė` and `Eglė Paulauskaitė`.
- No other teacher names appear.

---

### TC-S2-004 · `US2-AC3-01` — Selecting a teacher enables the date dropdown

| Field | Detail |
|---|---|
| **ID** | TC-S2-004 |
| **Test ID** | `US2-AC3-01` |
| **Requirement** | FR-008 |
| **Acceptance Criteria** | US2-AC3 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Select **Teacher** → `Rūta Kazlauskaitė`.

**Expected result**

- The **Start Date** dropdown becomes enabled.

---

### TC-S2-005 · `US2-AC3-02` — Date list matches the selected teacher's start dates

| Field | Detail |
|---|---|
| **ID** | TC-S2-005 |
| **Test ID** | `US2-AC3-02` |
| **Requirement** | FR-008 |
| **Acceptance Criteria** | US2-AC3 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Select **Teacher** → `Rūta Kazlauskaitė`.
4. Count options in the Start Date dropdown.

**Expected result**

- The Start Date dropdown contains exactly **2** options (matching `ruta-kazlauskaite`'s dates: `2026-08-03` and `2026-09-07`).

---

### TC-S2-006 · `US2-AC4-01` — Happy-path submission replaces form with confirmation message

| Field | Detail |
|---|---|
| **ID** | TC-S2-006 |
| **Test ID** | `US2-AC4-01` |
| **Requirement** | FR-009, FR-010 |
| **Acceptance Criteria** | US2-AC4 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Fill all personal info fields with `VALID_USER` data.
2. Select **Current Level** → `Beginner`.
3. Select **Desired Level** → `Intermediate`.
4. Select **Teacher** → `Rūta Kazlauskaitė`.
5. Select **Start Date** → `2026-08-03`.
6. Click **Submit**.

**Expected result**

- The confirmation message is visible.
- The form submit button is **no longer visible** (form is replaced).

---

### TC-S2-007 · `US2-AC4-02` — Confirmation message contains the correct course level name

| Field | Detail |
|---|---|
| **ID** | TC-S2-007 |
| **Test ID** | `US2-AC4-02` |
| **Requirement** | FR-010 |
| **Acceptance Criteria** | US2-AC4 |
| **Priority** | P2 |

**Preconditions**: Happy-path form submitted (same steps as TC-S2-006).

**Steps**

1. Read the text of the confirmation message.

**Expected result**

- The confirmation message contains the text **"Intermediate"**.

---

### TC-S2-008 · `US2-AC4-03` — Confirmation message contains the correct teacher name

| Field | Detail |
|---|---|
| **ID** | TC-S2-008 |
| **Test ID** | `US2-AC4-03` |
| **Requirement** | FR-010 |
| **Acceptance Criteria** | US2-AC4 |
| **Priority** | P2 |

**Preconditions**: Happy-path form submitted (same steps as TC-S2-006).

**Steps**

1. Read the text of the confirmation message.

**Expected result**

- The confirmation message contains the text **"Rūta Kazlauskaitė"**.

---

### TC-S2-009 · `US2-AC4-04` — Confirmation message contains the correct formatted start date

| Field | Detail |
|---|---|
| **ID** | TC-S2-009 |
| **Test ID** | `US2-AC4-04` |
| **Requirement** | FR-010 |
| **Acceptance Criteria** | US2-AC4 |
| **Priority** | P2 |

**Preconditions**: Happy-path form submitted (same steps as TC-S2-006).

**Steps**

1. Read the text of the confirmation message.

**Expected result**

- The confirmation message contains the text **"3 August 2026"** (en-GB locale formatting of `2026-08-03`).

---

### TC-S2-010 · `US2-AC4-05` — Confirmation appears within 1 000 ms of submission

| Field | Detail |
|---|---|
| **ID** | TC-S2-010 |
| **Test ID** | `US2-AC4-05` |
| **Requirement** | — |
| **Success Criteria** | SC-004 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Fill all personal info fields with `VALID_USER` data.
2. Select **Current Level** → `Beginner`.
3. Select **Desired Level** → `Intermediate`.
4. Select **Teacher** → `Rūta Kazlauskaitė`.
5. Select **Start Date** → `2026-08-03`.
6. Record the timestamp.
7. Click **Submit**.
8. Wait for the confirmation message to appear (timeout = **1 000 ms**).

**Expected result**

- The confirmation message becomes visible within **1 second** of clicking Submit.

---

### TC-S2-011 · `US2-AC5-01` — Submitting an empty form shows errors on all six required fields

| Field | Detail |
|---|---|
| **ID** | TC-S2-011 |
| **Test ID** | `US2-AC5-01` |
| **Requirement** | FR-009 |
| **Success Criteria** | SC-003 |
| **Acceptance Criteria** | US2-AC5 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5. No fields are filled.

**Steps**

1. Click **Submit** without filling any field.

**Expected result**

Inline validation errors are visible for all six required fields:

| Field | Error visible |
|---|---|
| First Name | ✓ |
| Last Name | ✓ |
| Email | ✓ |
| Phone | ✓ |
| Current Level | ✓ |
| Desired Level | ✓ |

---

### TC-S2-012 · `US2-AC5-02` — Submitting empty form does not show confirmation message

| Field | Detail |
|---|---|
| **ID** | TC-S2-012 |
| **Test ID** | `US2-AC5-02` |
| **Requirement** | FR-009 |
| **Success Criteria** | SC-003 |
| **Acceptance Criteria** | US2-AC5 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Click **Submit** without filling any field.

**Expected result**

- The confirmation message is **not visible**.

---

### TC-S2-013 · `US2-AC5-03` — Submitting with only personal info filled shows level errors

| Field | Detail |
|---|---|
| **ID** | TC-S2-013 |
| **Test ID** | `US2-AC5-03` |
| **Requirement** | FR-009 |
| **Success Criteria** | SC-003 |
| **Acceptance Criteria** | US2-AC5 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Fill all personal info fields with `VALID_USER` data.
2. Leave all level, teacher, and date fields empty.
3. Click **Submit**.

**Expected result**

- A validation error is visible on the **Current Level** field.
- A validation error is visible on the **Desired Level** field.

---

### TC-S2-014 · `US2-AC5-04` — Levels filled but no teacher shows teacher error

| Field | Detail |
|---|---|
| **ID** | TC-S2-014 |
| **Test ID** | `US2-AC5-04` |
| **Requirement** | FR-009 |
| **Success Criteria** | SC-003 |
| **Acceptance Criteria** | US2-AC5 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Fill all personal info fields with `VALID_USER` data.
2. Select **Current Level** → `Beginner`.
3. Select **Desired Level** → `Intermediate`.
4. Leave Teacher and Start Date unselected.
5. Click **Submit**.

**Expected result**

- A validation error is visible on the **Teacher** field.
- The confirmation message is **not visible**.

---

### TC-S2-015 · `US2-AC5-05` — All fields except date shows date error

| Field | Detail |
|---|---|
| **ID** | TC-S2-015 |
| **Test ID** | `US2-AC5-05` |
| **Requirement** | FR-009 |
| **Success Criteria** | SC-003 |
| **Acceptance Criteria** | US2-AC5 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Fill all personal info fields with `VALID_USER` data.
2. Select **Current Level** → `Beginner`.
3. Select **Desired Level** → `Intermediate`.
4. Select **Teacher** → `Rūta Kazlauskaitė`.
5. Leave Start Date unselected.
6. Click **Submit**.

**Expected result**

- A validation error is visible on the **Start Date** field.
- The confirmation message is **not visible**.

---

### TC-S2-016 · `US2-VAL-01` — Invalid email format blocks submission

| Field | Detail |
|---|---|
| **ID** | TC-S2-016 |
| **Test ID** | `US2-VAL-01` |
| **Requirement** | FR-009 |
| **Success Criteria** | SC-003 |
| **Acceptance Criteria** | US2-AC5 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Test data**: `INVALID_EMAIL_USER` (email = `not-an-email`, no `@`).

**Steps**

1. Fill First Name, Last Name with valid values.
2. Fill **Email** with `not-an-email`.
3. Fill Phone with a valid value.
4. Select **Current Level** → `Beginner`.
5. Select **Desired Level** → `Intermediate`.
6. Select **Teacher** → `Rūta Kazlauskaitė`.
7. Select **Start Date** → `2026-08-03`.
8. Click **Submit**.

**Expected result**

- A validation error on the **Email** field is visible and contains text matching `valid email`.
- The confirmation message is **not visible**.

---

### TC-S2-017 · `US2-VAL-02` — Invalid phone format blocks submission

| Field | Detail |
|---|---|
| **ID** | TC-S2-017 |
| **Test ID** | `US2-VAL-02` |
| **Requirement** | FR-009 |
| **Success Criteria** | SC-003 |
| **Acceptance Criteria** | US2-AC5 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Test data**: `INVALID_PHONE_USER` (phone = `abc@!#`).

**Steps**

1. Fill First Name, Last Name, Email with valid values.
2. Fill **Phone** with `abc@!#`.
3. Select **Current Level** → `Beginner`.
4. Select **Desired Level** → `Intermediate`.
5. Select **Teacher** → `Rūta Kazlauskaitė`.
6. Select **Start Date** → `2026-08-03`.
7. Click **Submit**.

**Expected result**

- A validation error on the **Phone** field is visible.
- The confirmation message is **not visible**.

---

### TC-S2-018 · `US2-SC002-01` — Teacher list updates without a page reload

| Field | Detail |
|---|---|
| **ID** | TC-S2-018 |
| **Test ID** | `US2-SC002-01` |
| **Requirement** | — |
| **Success Criteria** | SC-002 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5. A `framenavigated` event listener is attached to the page before any interaction.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Wait for the Teacher dropdown to become enabled.
4. Check the count of recorded `framenavigated` events.

**Expected result**

- The Teacher dropdown becomes enabled without any full-page navigation.
- The count of `framenavigated` events is **0**.

---

### TC-S2-019 · `US2-SC002-02` — Date list updates without a page reload

| Field | Detail |
|---|---|
| **ID** | TC-S2-019 |
| **Test ID** | `US2-SC002-02` |
| **Requirement** | — |
| **Success Criteria** | SC-002 |
| **Priority** | P2 |

**Preconditions**: Shared preconditions P-1 – P-5. A `framenavigated` event listener is attached to the page before any interaction.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Select **Teacher** → `Rūta Kazlauskaitė`.
4. Wait for the Start Date dropdown to become enabled.
5. Check the count of recorded `framenavigated` events.

**Expected result**

- The Start Date dropdown becomes enabled without any full-page navigation.
- The count of `framenavigated` events is **0**.

---

## Suite 3 — Dynamic Teacher & Date Selection

**File**: `tests/dynamicSelection.spec.ts`  
**User Story**: US3 (Priority P3)  
**Pass criteria**: All 17 tests green. Cascade reset clears dependent fields reliably. Submission always blocked on no-teacher combos.

---

### TC-S3-001 · `US3-AC1-01` — Teacher dropdown is disabled on page load

| Field | Detail |
|---|---|
| **ID** | TC-S3-001 |
| **Test ID** | `US3-AC1-01` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US3-AC1 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5. No fields have been interacted with.

**Steps**

1. Open `http://localhost:3000`.
2. Inspect the Teacher dropdown's `disabled` attribute.

**Expected result**

- The Teacher dropdown is **disabled**.

---

### TC-S3-002 · `US3-AC1-02` — Teacher hint prompts user to select levels first

| Field | Detail |
|---|---|
| **ID** | TC-S3-002 |
| **Test ID** | `US3-AC1-02` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US3-AC1 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Locate the hint text near the Teacher dropdown.

**Expected result**

- The hint is visible and contains the text **"Please select your current and desired levels first"**.

---

### TC-S3-003 · `US3-AC1-03` — Date dropdown is disabled on page load

| Field | Detail |
|---|---|
| **ID** | TC-S3-003 |
| **Test ID** | `US3-AC1-03` |
| **Requirement** | FR-008 |
| **Acceptance Criteria** | US3-AC1 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Inspect the Start Date dropdown's `disabled` attribute.

**Expected result**

- The Start Date dropdown is **disabled**.

---

### TC-S3-004 · `US3-AC1-04` — Date hint prompts user to select a teacher

| Field | Detail |
|---|---|
| **ID** | TC-S3-004 |
| **Test ID** | `US3-AC1-04` |
| **Requirement** | FR-008 |
| **Acceptance Criteria** | US3-AC1 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Open `http://localhost:3000`.
2. Locate the hint text near the Start Date dropdown.

**Expected result**

- The hint is visible and contains the text **"Please select a teacher to see available start dates"**.

---

### TC-S3-005 · `US3-AC2-01` — Teacher list populates after both levels are selected

| Field | Detail |
|---|---|
| **ID** | TC-S3-005 |
| **Test ID** | `US3-AC2-01` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US3-AC2 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.

**Expected result**

- The Teacher dropdown is **enabled**.
- It contains exactly **2** options (matching `beginner→intermediate` combo).

---

### TC-S3-006 · `US3-AC2-02` — Changing level combination updates the teacher list

| Field | Detail |
|---|---|
| **ID** | TC-S3-006 |
| **Test ID** | `US3-AC2-02` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US3-AC2 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner` and **Desired Level** → `Beginner`.
2. Record the teacher list (expected: `[Rūta Kazlauskaitė, Viktorija Stankevičienė]`).
3. Select **Current Level** → `Intermediate` and **Desired Level** → `Advanced`.
4. Record the updated teacher list (expected: `[Tomas Bernatas, Mindaugas Jurgaitis]`).

**Expected result**

- The two teacher lists are **different**.
- Each list contains the correct names for its combination.

---

### TC-S3-007 · `US3-AC2-03` — Each level combination exposes exactly the correct teacher names

| Field | Detail |
|---|---|
| **ID** | TC-S3-007 |
| **Test ID** | `US3-AC2-03` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US3-AC2 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps** *(repeat for each combination below)*

1. Select **Current Level** and **Desired Level** as specified.
2. Verify the teacher option count and names.

| Iteration | Current Level | Desired Level | Expected teachers |
|---|---|---|---|
| 1 | Beginner | Beginner | Rūta Kazlauskaitė, Viktorija Stankevičienė |
| 2 | Beginner | Intermediate | Rūta Kazlauskaitė, Eglė Paulauskaitė |
| 3 | Intermediate | Intermediate | Tomas Bernatas, Viktorija Stankevičienė |
| 4 | Intermediate | Advanced | Tomas Bernatas, Mindaugas Jurgaitis |
| 5 | Advanced | Advanced | Eglė Paulauskaitė, Mindaugas Jurgaitis |

**Expected result**

- For each combination, the Teacher dropdown contains **exactly** the expected number of options.
- Each expected teacher name is present in the list.

---

### TC-S3-008 · `US3-AC3-01` — Date list populates after a teacher is selected

| Field | Detail |
|---|---|
| **ID** | TC-S3-008 |
| **Test ID** | `US3-AC3-01` |
| **Requirement** | FR-008 |
| **Acceptance Criteria** | US3-AC3 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Select **Teacher** → `Rūta Kazlauskaitė`.

**Expected result**

- The Start Date dropdown is **enabled**.
- It contains exactly **2** options (Rūta's dates: `2026-08-03`, `2026-09-07`).

---

### TC-S3-009 · `US3-AC3-02` — Changing teacher updates the date list

| Field | Detail |
|---|---|
| **ID** | TC-S3-009 |
| **Test ID** | `US3-AC3-02` |
| **Requirement** | FR-008 |
| **Acceptance Criteria** | US3-AC3 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`, **Desired Level** → `Beginner`.
2. Select **Teacher** → `Rūta Kazlauskaitė`.
3. Record the date list (expected: 2 dates).
4. Select **Teacher** → `Viktorija Stankevičienė`.
5. Record the updated date list (expected: 3 dates).

**Expected result**

- The two date lists are **different**.
- Rūta's list has **2** options; Viktorija's list has **3** options.

---

### TC-S3-010 · `US3-AC3-03` — Date hint disappears once a teacher is selected

| Field | Detail |
|---|---|
| **ID** | TC-S3-010 |
| **Test ID** | `US3-AC3-03` |
| **Requirement** | FR-008 |
| **Acceptance Criteria** | US3-AC3 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Select **Teacher** → `Rūta Kazlauskaitė`.
4. Check whether the date hint text is visible.

**Expected result**

- The date hint (previously showing "Please select a teacher…") is **not visible**.

---

### TC-S3-011 · `US3-AC4-01` — Friendly "No teachers available" hint shown for beginner→advanced

| Field | Detail |
|---|---|
| **ID** | TC-S3-011 |
| **Test ID** | `US3-AC4-01` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US3-AC4 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Advanced`.
3. Check the teacher area.

**Expected result**

- A hint is visible containing **"No teachers available for this combination"**.

---

### TC-S3-012 · `US3-AC4-02` — Teacher dropdown stays disabled when no teachers match

| Field | Detail |
|---|---|
| **ID** | TC-S3-012 |
| **Test ID** | `US3-AC4-02` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US3-AC4 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Advanced`.
3. Inspect the Teacher dropdown.

**Expected result**

- The Teacher dropdown remains **disabled**.

---

### TC-S3-013 · `US3-AC4-03` — "No teachers" hint shown for every known zero-match combination

| Field | Detail |
|---|---|
| **ID** | TC-S3-013 |
| **Test ID** | `US3-AC4-03` |
| **Requirement** | FR-007 |
| **Acceptance Criteria** | US3-AC4 |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps** *(repeat for each zero-match combo)*

1. Select the Current Level and Desired Level as specified.
2. Read the teacher hint text.

| Iteration | Current Level | Desired Level |
|---|---|---|
| 1 | Beginner | Advanced |
| 2 | Advanced | Beginner |
| 3 | Advanced | Intermediate |
| 4 | Intermediate | Beginner |

**Expected result**

- For every combination listed, the teacher hint contains **"No teachers available for this combination"**.

---

### TC-S3-014 · `US3-EDGE-01` — Changing current level after teacher selection clears teacher and disables date

| Field | Detail |
|---|---|
| **ID** | TC-S3-014 |
| **Test ID** | `US3-EDGE-01` |
| **Requirement** | spec edge cases |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Select **Teacher** → `Rūta Kazlauskaitė`.
4. Select **Start Date** → `2026-08-03`.
5. Change **Current Level** → `Intermediate`.

**Expected result**

- The Teacher dropdown value is reset to empty (`""`).
- The Start Date dropdown is **disabled**.

---

### TC-S3-015 · `US3-EDGE-02` — Changing desired level after teacher selection clears teacher and disables date

| Field | Detail |
|---|---|
| **ID** | TC-S3-015 |
| **Test ID** | `US3-EDGE-02` |
| **Requirement** | spec edge cases |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Select **Teacher** → `Rūta Kazlauskaitė`.
4. Select **Start Date** → `2026-08-03`.
5. Change **Desired Level** → `Beginner`.

**Expected result**

- The Teacher dropdown value is reset to empty (`""`).
- The Start Date dropdown is **disabled**.

---

### TC-S3-016 · `US3-EDGE-03` — Teacher hint reappears after level change moves to a no-match combo

| Field | Detail |
|---|---|
| **ID** | TC-S3-016 |
| **Test ID** | `US3-EDGE-03` |
| **Requirement** | spec edge cases |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Select **Current Level** → `Beginner`.
2. Select **Desired Level** → `Intermediate`.
3. Select **Teacher** → `Rūta Kazlauskaitė`.
4. Change **Desired Level** → `Advanced` (a no-match combination).

**Expected result**

- The teacher hint is **visible**.
- The teacher hint contains **"No teachers available for this combination"**.

---

### TC-S3-017 · `US3-EDGE-04` — Submission is blocked when level combination has no available teachers

| Field | Detail |
|---|---|
| **ID** | TC-S3-017 |
| **Test ID** | `US3-EDGE-04` |
| **Requirement** | FR-009, spec edge cases |
| **Priority** | P3 |

**Preconditions**: Shared preconditions P-1 – P-5.

**Steps**

1. Fill all personal info fields with `VALID_USER` data.
2. Select **Current Level** → `Beginner`.
3. Select **Desired Level** → `Advanced` (no teachers available).
4. Click **Submit**.

**Expected result**

- The confirmation message is **not visible**.
- The teacher hint still displays **"No teachers available for this combination"**.

---

## Appendix A — Requirements Coverage Matrix

| Requirement | Description | Test Case IDs |
|---|---|---|
| FR-001 | School overview (name, description, highlights) | TC-S1-001, TC-S1-002, TC-S1-003 |
| FR-002 | Courses section with ≥ 3 level cards | TC-S1-004, TC-S1-005, TC-S1-006, TC-S1-007 |
| FR-003 | CTA scrolls to registration form | TC-S1-008, TC-S1-009 |
| FR-004 | Personal info fields | TC-S2-001, TC-S2-016, TC-S2-017 |
| FR-005 | Current level selector | TC-S2-002 |
| FR-006 | Desired level selector | TC-S2-002 |
| FR-007 | Dynamic teacher list by level combo | TC-S2-003, TC-S3-001, TC-S3-002, TC-S3-005, TC-S3-006, TC-S3-007, TC-S3-011, TC-S3-012, TC-S3-013 |
| FR-008 | Dynamic start-date list by teacher | TC-S2-004, TC-S2-005, TC-S3-003, TC-S3-004, TC-S3-008, TC-S3-009, TC-S3-010 |
| FR-009 | Validation before submission | TC-S2-011, TC-S2-012, TC-S2-013, TC-S2-014, TC-S2-015, TC-S2-016, TC-S2-017, TC-S3-017 |
| FR-010 | Confirmation message with level, teacher, date | TC-S2-006, TC-S2-007, TC-S2-008, TC-S2-009 |
| FR-013 | Semantic landmarks; keyboard navigation | TC-S1-010, TC-S1-011, TC-S1-012, TC-S1-013, TC-S1-014, TC-S1-015 |
| SC-002 | No perceptible delay / page reload on dynamic updates | TC-S2-018, TC-S2-019 |
| SC-003 | 100 % of invalid submissions blocked | TC-S2-011 – TC-S2-017 |
| SC-004 | Confirmation within 1 second | TC-S2-010 |
| SC-005 | Keyboard-navigable sections | TC-S1-015 |

---

## Appendix B — Edge Case Summary

| Edge Case | Test Case IDs | Expected Behaviour |
|---|---|---|
| Level combo with no matching teachers (`beginner→advanced`) | TC-S3-011, TC-S3-012, TC-S3-013 | Friendly inline message; teacher dropdown disabled; submission blocked |
| Submit with missing required fields | TC-S2-011 – TC-S2-015 | Each empty field highlighted; confirmation never shown |
| Changing level after teacher + date selected | TC-S3-014, TC-S3-015 | Teacher value reset to `""`; date dropdown disabled |
| Invalid email format | TC-S2-016 | Error shown on email field; submission blocked |
| Invalid phone format | TC-S2-017 | Error shown on phone field; submission blocked |
| Submit when no teachers available (personal info filled) | TC-S3-017 | Confirmation absent; "no teachers" hint still visible |
