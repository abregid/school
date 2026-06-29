// A named proficiency tier. Used as both "current level" and "desired level".
export interface CourseLevel {
    id: string;           // unique slug, e.g. "beginner"
    name: string;         // English label, e.g. "Beginner"
    nameLT: string;       // Lithuanian label, e.g. "Pradedantysis"
    description: string;  // ≤ 200 chars; shown in the Courses section card
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

// School information displayed in the hero section.
export interface SchoolInfo {
    name: string;
    tagline: string;
    description: string;
    highlights: string[]; // ≥ 3 value propositions
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
