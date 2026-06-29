# Contract: Embedded Mock Data Schema

**Feature**: `001-language-school-landing`
**Date**: 2026-06-29
**Type**: Client-side data contract (TypeScript interfaces + constant shape)
**Source file**: `src/data/mock.ts` (instantiation), `src/types/index.ts` (type definitions)

> This is a **static data contract**, not an HTTP API contract. The project has
> no external endpoints. This document defines the shape of the data that
> components depend on, so that the data and UI layers can be developed and
> validated independently.

---

## TypeScript Interfaces (`src/types/index.ts`)

```typescript
// A named proficiency tier. Used as both "current level" and "desired level".
export interface CourseLevel {
  id: string;          // unique slug, e.g. "beginner"
  name: string;        // English label, e.g. "Beginner"
  nameLT: string;      // Lithuanian label, e.g. "Pradedantysis"
  description: string; // ≤ 200 chars; shown in the Courses section card
}

// A (from → to) teaching combination embedded inside Teacher.
export interface TeachingPair {
  fromLevelId: string; // references CourseLevel.id
  toLevelId: string;   // references CourseLevel.id
}

// A teacher who handles one or more level combinations.
export interface Teacher {
  id: string;              // unique slug, e.g. "ruta-kazlauskaite"
  name: string;            // full display name
  bio: string;             // ≤ 120 chars; shown in TeacherSelect
  teaches: TeachingPair[]; // level combos this teacher covers (length ≥ 1)
  startDates: string[];    // ISO-8601 dates (YYYY-MM-DD), length ≥ 2
}

// Client-side form state (not persisted).
export interface RegistrationFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLevelId: string;
  desiredLevelId: string;
  teacherId: string;
  startDate: string;
}

// Field-level validation errors (keys mirror RegistrationFormState).
export type FormErrors = Partial<Record<keyof RegistrationFormState, string>>;
```

---

## Exported Constants (`src/data/mock.ts`)

```typescript
import type { CourseLevel, Teacher } from '@/types';

export const COURSE_LEVELS: CourseLevel[] = [ /* ... */ ];
export const TEACHERS: Teacher[] = [ /* ... */ ];
```

### `COURSE_LEVELS` — required shape

Must contain exactly **3 entries**, one per tier:

```typescript
[
  {
    id: "beginner",
    name: "Beginner",
    nameLT: "Pradedantysis",
    description: "…"        // ≤ 200 chars
  },
  {
    id: "intermediate",
    name: "Intermediate",
    nameLT: "Pažengęs",
    description: "…"
  },
  {
    id: "advanced",
    name: "Advanced",
    nameLT: "Pažengęs / Aukštesnis",
    description: "…"
  }
]
```

### `TEACHERS` — required shape

Must contain **≥ 5 entries**. Each entry must satisfy:

```typescript
{
  id: string,             // unique, kebab-case
  name: string,           // non-empty
  bio: string,            // non-empty, ≤ 120 chars
  teaches: [              // ≥ 1 TeachingPair
    { fromLevelId: string, toLevelId: string },
    // …
  ],
  startDates: [           // ≥ 2 ISO-8601 strings
    "YYYY-MM-DD",
    "YYYY-MM-DD",
    // …
  ]
}
```

Collectively, the 5 teachers must cover **≥ 4 distinct** `(fromLevelId, toLevelId)` pairs so that the dynamic filtering is exercisable during validation.

---

## Derived State Contract

Components do **not** mutate `COURSE_LEVELS` or `TEACHERS`. Derived lists are computed inline:

| Derived value | Derivation |
|---------------|-----------|
| `availableTeachers: Teacher[]` | `TEACHERS.filter(t => t.teaches.some(p => p.fromLevelId === currentLevelId && p.toLevelId === desiredLevelId))` |
| `availableDates: string[]` | `TEACHERS.find(t => t.id === teacherId)?.startDates ?? []` |

---

## Invariants

1. Every `TeachingPair.fromLevelId` and `TeachingPair.toLevelId` must match an `id` in `COURSE_LEVELS`.
2. Every `Teacher.id` is unique across `TEACHERS`.
3. Every `CourseLevel.id` is unique across `COURSE_LEVELS`.
4. `startDates` contains no duplicates within a single teacher.
5. All `startDates` values are valid ISO-8601 calendar dates (`YYYY-MM-DD`).

Violations of these invariants will cause silent filtering failures (empty teacher/date lists) and should be caught during development by a unit test over the mock data itself.

---

## Compatibility Notes

- This contract is intentionally structured so that `src/data/mock.ts` can be replaced by an API fetch in a future version — components depend only on the **interface**, not the constant name or file location.
- If `COURSE_LEVELS` or `TEACHERS` grow beyond the mock, no component code changes are required.
