/**
 * Test data fixtures — mirrors src/data/mock.ts.
 * Kept in one place so a mock-data change only needs a single update here.
 */

// ---------------------------------------------------------------------------
// Personal info
// ---------------------------------------------------------------------------

export const VALID_USER = {
    firstName: 'Anna',
    lastName: 'Smith',
    email: 'anna.smith@example.com',
    phone: '+370 600 12345',
} as const;

export const INVALID_EMAIL_USER = { ...VALID_USER, email: 'not-an-email' };
export const INVALID_PHONE_USER = { ...VALID_USER, phone: 'abc@!#' };

// ---------------------------------------------------------------------------
// Happy-path registration fixture
// beginner → intermediate | Rūta Kazlauskaitė | 3 August 2026
// ---------------------------------------------------------------------------

export const VALID_REGISTRATION = {
    ...VALID_USER,
    currentLevelId: 'beginner',
    desiredLevelId: 'intermediate',
    teacherId: 'ruta-kazlauskaite',
    startDate: '2026-08-03',
} as const;

// ---------------------------------------------------------------------------
// Course levels
// ---------------------------------------------------------------------------

export const COURSE_LEVELS = [
    { id: 'beginner', name: 'Beginner', nameLT: 'Pradedantysis' },
    { id: 'intermediate', name: 'Intermediate', nameLT: 'Pažengęs' },
    { id: 'advanced', name: 'Advanced', nameLT: 'Aukštesnis' },
] as const;

// ---------------------------------------------------------------------------
// Teacher names keyed by "currentLevelId→desiredLevelId"
// ---------------------------------------------------------------------------

export const TEACHERS_BY_COMBO: Record<string, readonly string[]> = {
    'beginner→beginner': ['Rūta Kazlauskaitė', 'Viktorija Stankevičienė'],
    'beginner→intermediate': ['Rūta Kazlauskaitė', 'Eglė Paulauskaitė'],
    'intermediate→intermediate': ['Tomas Bernatas', 'Viktorija Stankevičienė'],
    'intermediate→advanced': ['Tomas Bernatas', 'Mindaugas Jurgaitis'],
    'advanced→advanced': ['Eglė Paulauskaitė', 'Mindaugas Jurgaitis'],
};

/** Level combos that have NO matching teachers — used for negative tests. */
export const NO_TEACHER_COMBOS: Array<{ currentLevelId: string; desiredLevelId: string }> = [
    { currentLevelId: 'beginner', desiredLevelId: 'advanced' },
    { currentLevelId: 'advanced', desiredLevelId: 'beginner' },
    { currentLevelId: 'advanced', desiredLevelId: 'intermediate' },
    { currentLevelId: 'intermediate', desiredLevelId: 'beginner' },
];

// ---------------------------------------------------------------------------
// Start dates per teacher id
// ---------------------------------------------------------------------------

export const START_DATES_BY_TEACHER: Readonly<Record<string, readonly string[]>> = {
    'ruta-kazlauskaite': ['2026-08-03', '2026-09-07'],
    'tomas-bernotas': ['2026-07-14', '2026-08-18', '2026-10-06'],
    'egle-paulauskaite': ['2026-07-21', '2026-09-14'],
    'mindaugas-jurgaitis': ['2026-08-10', '2026-10-12'],
    'viktorija-stankeviciene': ['2026-07-07', '2026-08-25', '2026-11-03'],
};

// ---------------------------------------------------------------------------
// Expected confirmation message content for VALID_REGISTRATION
// ---------------------------------------------------------------------------

export const CONFIRMATION = {
    levelName: 'Intermediate',
    teacherName: 'Rūta Kazlauskaitė',
    startDate: '3 August 2026', // formatDate('2026-08-03') in en-GB locale
} as const;
