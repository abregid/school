import type { SchoolInfo, CourseLevel, Teacher } from '@/types';

// ---------------------------------------------------------------------------
// School information (consumed by HeroSection)
// ---------------------------------------------------------------------------
export const SCHOOL_INFO: SchoolInfo = {
    name: 'Lietuvių Kalba',
    tagline: 'Discover the Language of the Baltic',
    description:
        'Lietuvių Kalba is a dedicated Lithuanian language school offering structured, ' +
        'communicative courses for all proficiency levels. Whether you are taking your ' +
        'very first steps or deepening existing skills, our experienced teachers will ' +
        'guide you through Lithuania\'s rich linguistic heritage in a welcoming environment.',
    highlights: [
        'Small groups (max 8 students) for personalised attention',
        'Native-speaking teachers with formal linguistics qualifications',
        'Flexible start dates — join a new cohort every month',
        'Curriculum aligned with the Common European Framework (CEFR)',
        'Cultural immersion activities included in every course',
    ],
};

// ---------------------------------------------------------------------------
// Course levels (exactly 3 — spec FR-002)
// ---------------------------------------------------------------------------
export const COURSE_LEVELS: CourseLevel[] = [
    {
        id: 'beginner',
        name: 'Beginner',
        nameLT: 'Pradedantysis',
        description:
            'Start from zero. Learn the Lithuanian alphabet, basic greetings, ' +
            'everyday vocabulary, and simple sentence structures in a supportive setting.',
    },
    {
        id: 'intermediate',
        name: 'Intermediate',
        nameLT: 'Pažengęs',
        description:
            'Build on your foundations. Expand vocabulary, tackle grammar nuances, ' +
            'and gain confidence in real-life conversations and written communication.',
    },
    {
        id: 'advanced',
        name: 'Advanced',
        nameLT: 'Aukštesnis',
        description:
            'Refine your fluency. Explore complex grammar, idiomatic expressions, ' +
            'literature, and professional language use for work or academic contexts.',
    },
];

// ---------------------------------------------------------------------------
// Teachers (≥ 5 entries; ≥ 4 distinct TeachingPair combos collectively)
// ---------------------------------------------------------------------------
export const TEACHERS: Teacher[] = [
    {
        id: 'ruta-kazlauskaite',
        name: 'Rūta Kazlauskaitė',
        bio: 'MA in Lithuanian Philology. 8 years teaching beginners; known for patient, communicative lessons.',
        teaches: [
            { fromLevelId: 'beginner', toLevelId: 'beginner' },
            { fromLevelId: 'beginner', toLevelId: 'intermediate' },
        ],
        startDates: ['2026-08-03', '2026-09-07'],
    },
    {
        id: 'tomas-bernotas',
        name: 'Tomas Bernatas',
        bio: 'Certified CEFR examiner. Specialises in grammar-focused intermediate and advanced courses.',
        teaches: [
            { fromLevelId: 'intermediate', toLevelId: 'intermediate' },
            { fromLevelId: 'intermediate', toLevelId: 'advanced' },
        ],
        startDates: ['2026-07-14', '2026-08-18', '2026-10-06'],
    },
    {
        id: 'egle-paulauskaite',
        name: 'Eglė Paulauskaitė',
        bio: 'Former University of Vilnius lecturer. Teaches advanced and beginner cohorts with cultural context.',
        teaches: [
            { fromLevelId: 'advanced', toLevelId: 'advanced' },
            { fromLevelId: 'beginner', toLevelId: 'intermediate' },
        ],
        startDates: ['2026-07-21', '2026-09-14'],
    },
    {
        id: 'mindaugas-jurgaitis',
        name: 'Mindaugas Jurgaitis',
        bio: 'Conversation specialist with 5 years abroad. Brings authentic colloquial Lithuanian to every session.',
        teaches: [
            { fromLevelId: 'intermediate', toLevelId: 'advanced' },
            { fromLevelId: 'advanced', toLevelId: 'advanced' },
        ],
        startDates: ['2026-08-10', '2026-10-12'],
    },
    {
        id: 'viktorija-stankeviciene',
        name: 'Viktorija Stankevičienė',
        bio: 'Business Lithuanian expert. Helps intermediate learners reach professional fluency quickly.',
        teaches: [
            { fromLevelId: 'beginner', toLevelId: 'beginner' },
            { fromLevelId: 'intermediate', toLevelId: 'intermediate' },
        ],
        startDates: ['2026-07-07', '2026-08-25', '2026-11-03'],
    },
];
