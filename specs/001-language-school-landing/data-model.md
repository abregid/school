# Data Model: Lithuanian Language School Landing Page

**Feature**: `001-language-school-landing`
**Date**: 2026-06-29
**Source**: [spec.md](spec.md) § Key Entities, [research.md](research.md) Decision 5

> All entities below are **client-side only**. There is no database. They are
> represented as TypeScript interfaces in `src/types/index.ts` and instantiated
> as constant arrays in `src/data/mock.ts`.

---

## Entities

### CourseLevel

Represents a named proficiency tier. Used in two roles on the form:
- **Current level** — the student's existing ability
- **Desired level** — the course/group the student wants to join

| Field | Type | Required | Constraints | Notes |
|-------|------|----------|-------------|-------|
| `id` | `string` | ✅ | Unique across all levels; URL-safe slug | e.g. `"beginner"` |
| `name` | `string` | ✅ | Non-empty | English display name, e.g. `"Beginner"` |
| `nameLT` | `string` | ✅ | Non-empty | Lithuanian equivalent, e.g. `"Pradedantysis"` |
| `description` | `string` | ✅ | Non-empty, ≤ 200 chars | Shown in the Courses section card (FR-002) |

**Instances required**: Exactly 3 — `beginner`, `intermediate`, `advanced` (spec FR-002).

---

### TeachingPair

A value object (no `id`) embedded inside `Teacher.teaches`. Represents one
(current → desired) level combination that a teacher handles.

| Field | Type | Required | Constraints | Notes |
|-------|------|----------|-------------|-------|
| `fromLevelId` | `string` | ✅ | Must match a `CourseLevel.id` | Student's current level |
| `toLevelId` | `string` | ✅ | Must match a `CourseLevel.id` | Desired course level |

**Note**: `fromLevelId` and `toLevelId` may be equal (e.g. a student at Intermediate
wanting to deepen skills in an Intermediate group) — this is valid and left to the
teacher data to define.

---

### Teacher

A person who teaches one or more `TeachingPair` combinations and has a set of
available course start dates.

| Field | Type | Required | Constraints | Notes |
|-------|------|----------|-------------|-------|
| `id` | `string` | ✅ | Unique across all teachers; URL-safe slug | e.g. `"ruta-kazlauskaite"` |
| `name` | `string` | ✅ | Non-empty | Full display name |
| `bio` | `string` | ✅ | Non-empty, ≤ 120 chars | Short bio shown in teacher selector |
| `teaches` | `TeachingPair[]` | ✅ | Length ≥ 1 | Level combinations this teacher handles |
| `startDates` | `string[]` | ✅ | Length ≥ 2; each value is a valid ISO-8601 date (`YYYY-MM-DD`) | Available course start dates |

**Instances required**: ≥ 5 embedded teachers (spec Assumptions), with collective
coverage across all level combinations that can be constructed from 3 levels.

---

### RegistrationFormState

Client-side form state managed by `useReducer` inside `RegistrationForm.tsx`.
Not persisted anywhere — discarded on page reload.

| Field | Type | Required | Validation Rule | Notes |
|-------|------|----------|-----------------|-------|
| `firstName` | `string` | ✅ | Non-empty after trim | FR-004 |
| `lastName` | `string` | ✅ | Non-empty after trim | FR-004 |
| `email` | `string` | ✅ | Matches `RFC 5322` simplified pattern: `/.+@.+\..+/` | FR-004 |
| `phone` | `string` | ✅ | Non-empty after trim; digits, spaces, `+`, `()`, `-` only | FR-004 |
| `currentLevelId` | `string` | ✅ | Must match a `CourseLevel.id` | FR-005 |
| `desiredLevelId` | `string` | ✅ | Must match a `CourseLevel.id` | FR-006 |
| `teacherId` | `string` | ✅ | Must match a `Teacher.id` from `availableTeachers` | FR-007 |
| `startDate` | `string` | ✅ | Must match an ISO-8601 date from selected teacher's `startDates` | FR-008 |

---

## Relationships

```
CourseLevel ──< TeachingPair >── CourseLevel
                     │
                     └── embedded in
                              │
                         Teacher (1..*) ──< startDates (string[])
                              │
                              └── drives RegistrationFormState.teacherId
                                        RegistrationFormState.startDate
```

- A `Teacher` embeds one or more `TeachingPair` values that reference `CourseLevel.id`.
- Filtering logic derives `availableTeachers` from all teachers whose `teaches` array
  contains a pair matching `(currentLevelId, desiredLevelId)`.
- `availableDates` is the `startDates` array of the currently selected teacher.

---

## State Transitions

```
Initial state
  → user fills personal info (firstName, lastName, email, phone)
  → user selects currentLevelId
  → user selects desiredLevelId          → availableTeachers recalculated
  → [no matching teachers]               → inline message; teacherId = ""; startDate = ""
  → user selects teacherId               → availableDates = teacher.startDates
  → [level changes after teacher set]    → teacherId = ""; startDate = "" (cascading reset)
  → [teacher changes after date set]     → startDate = "" (cascading reset)
  → user selects startDate
  → user submits form
      → [any required field empty]       → field errors shown; submission blocked (FR-009)
      → [all fields valid]               → form hidden; ConfirmationMessage shown (FR-010)
```

---

## Validation Rules Summary

| Rule | Enforced At |
|------|-------------|
| All 8 fields required before submit | `RegistrationForm.tsx` submit handler |
| Email format | `PersonalInfoFields.tsx` on blur + submit |
| Phone characters | `PersonalInfoFields.tsx` on blur + submit |
| `teacherId` must be from `availableTeachers` | Guaranteed by UI (select renders only valid options) |
| `startDate` must be from teacher's `startDates` | Guaranteed by UI (select renders only valid options) |
| If level combo has no teachers → block submit | `RegistrationForm.tsx` (teacherId empty → invalid) |

---

## Mock Data Minimum Requirements

Per spec Assumptions:

| Entity | Minimum count |
|--------|--------------|
| `CourseLevel` | 3 (beginner, intermediate, advanced) |
| `Teacher` | 5 |
| `startDates` per teacher | 2 |
| Covered `TeachingPair` combos | At least 4 distinct combos across all teachers |
