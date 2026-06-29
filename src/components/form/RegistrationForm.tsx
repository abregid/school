'use client';

import { useReducer } from 'react';
import type { RegistrationFormState, FormErrors, Teacher } from '@/types';
import { COURSE_LEVELS, TEACHERS } from '@/data/mock';
import PersonalInfoFields from './PersonalInfoFields';
import LevelSelect from './LevelSelect';
import TeacherSelect from './TeacherSelect';
import DateSelect from './DateSelect';
import ConfirmationMessage from './ConfirmationMessage';
import styles from './RegistrationForm.module.css';

// ---------------------------------------------------------------------------
// Extended state shape
// ---------------------------------------------------------------------------
interface FormState {
    fields: RegistrationFormState;
    availableTeachers: Teacher[];
    availableDates: string[];
    errors: FormErrors;
    submitted: boolean;
}

// ---------------------------------------------------------------------------
// Reducer actions
// ---------------------------------------------------------------------------
type Action =
    | { type: 'SET_FIELD'; field: keyof RegistrationFormState; value: string }
    | { type: 'SET_LEVELS'; currentLevelId: string; desiredLevelId: string }
    | { type: 'SET_TEACHER'; teacherId: string }
    | { type: 'SET_ERRORS'; errors: FormErrors }
    | { type: 'SUBMIT' };

function filterTeachers(currentLevelId: string, desiredLevelId: string): Teacher[] {
    if (!currentLevelId || !desiredLevelId) return [];
    return TEACHERS.filter((t: Teacher) =>
        t.teaches.some(
            (p) => p.fromLevelId === currentLevelId && p.toLevelId === desiredLevelId,
        ),
    );
}

function reducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                fields: { ...state.fields, [action.field]: action.value },
                errors: { ...state.errors, [action.field]: undefined },
            };

        case 'SET_LEVELS': {
            const availableTeachers = filterTeachers(
                action.currentLevelId,
                action.desiredLevelId,
            );
            return {
                ...state,
                fields: {
                    ...state.fields,
                    currentLevelId: action.currentLevelId,
                    desiredLevelId: action.desiredLevelId,
                    teacherId: '',
                    startDate: '',
                },
                availableTeachers,
                availableDates: [],
                errors: {
                    ...state.errors,
                    currentLevelId: undefined,
                    desiredLevelId: undefined,
                    teacherId: undefined,
                    startDate: undefined,
                },
            };
        }

        case 'SET_TEACHER': {
            const teacher = TEACHERS.find((t: Teacher) => t.id === action.teacherId);
            const availableDates = teacher?.startDates ?? [];
            return {
                ...state,
                fields: {
                    ...state.fields,
                    teacherId: action.teacherId,
                    startDate: '',
                },
                availableDates,
                errors: {
                    ...state.errors,
                    teacherId: undefined,
                    startDate: undefined,
                },
            };
        }

        case 'SET_ERRORS':
            return { ...state, errors: action.errors };

        case 'SUBMIT':
            return { ...state, submitted: true };

        default:
            return state;
    }
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
const EMAIL_RE = /.+@.+\..+/;
const PHONE_RE = /^[\d\s+()-]+$/;

function validate(
    fields: RegistrationFormState,
    availableTeachers: Teacher[],
): FormErrors {
    const errors: FormErrors = {};

    if (!fields.firstName.trim()) errors.firstName = 'First name is required.';
    if (!fields.lastName.trim()) errors.lastName = 'Last name is required.';
    if (!fields.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!EMAIL_RE.test(fields.email)) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!fields.phone.trim()) {
        errors.phone = 'Phone number is required.';
    } else if (!PHONE_RE.test(fields.phone)) {
        errors.phone = 'Phone may only contain digits, spaces, +, (), and -.';
    }
    if (!fields.currentLevelId) errors.currentLevelId = 'Please select your current level.';
    if (!fields.desiredLevelId) errors.desiredLevelId = 'Please select your desired level.';
    if (availableTeachers.length === 0 && fields.currentLevelId && fields.desiredLevelId) {
        errors.teacherId =
            'No teachers available for this level combination. Please choose another level.';
    } else if (!fields.teacherId) {
        errors.teacherId = 'Please select a teacher.';
    }
    if (!fields.startDate) errors.startDate = 'Please select a start date.';

    return errors;
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
const INITIAL_STATE: FormState = {
    fields: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentLevelId: '',
        desiredLevelId: '',
        teacherId: '',
        startDate: '',
    },
    availableTeachers: [],
    availableDates: [],
    errors: {},
    submitted: false,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function RegistrationForm() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { fields, availableTeachers, availableDates, errors, submitted } = state;

    const selectedTeacher = TEACHERS.find((t: Teacher) => t.id === fields.teacherId);
    const selectedLevel = COURSE_LEVELS.find((l) => l.id === fields.desiredLevelId);

    if (submitted && selectedTeacher && selectedLevel) {
        return (
            <ConfirmationMessage
                levelName={selectedLevel.name}
                teacherName={selectedTeacher.name}
                startDate={fields.startDate}
            />
        );
    }

    function handleFieldChange(
        field: keyof Pick<RegistrationFormState, 'firstName' | 'lastName' | 'email' | 'phone'>,
        value: string,
    ) {
        dispatch({ type: 'SET_FIELD', field, value });
    }

    function handleCurrentLevelChange(value: string) {
        dispatch({ type: 'SET_LEVELS', currentLevelId: value, desiredLevelId: fields.desiredLevelId });
    }

    function handleDesiredLevelChange(value: string) {
        dispatch({ type: 'SET_LEVELS', currentLevelId: fields.currentLevelId, desiredLevelId: value });
    }

    function handleTeacherChange(value: string) {
        dispatch({ type: 'SET_TEACHER', teacherId: value });
    }

    function handleDateChange(value: string) {
        dispatch({ type: 'SET_FIELD', field: 'startDate', value });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const validationErrors = validate(fields, availableTeachers);
        if (Object.keys(validationErrors).length > 0) {
            dispatch({ type: 'SET_ERRORS', errors: validationErrors });
            return;
        }
        dispatch({ type: 'SUBMIT' });
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Course registration form"
        >
            {/* Personal Information */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Personal Information</h3>
                <PersonalInfoFields
                    values={{
                        firstName: fields.firstName,
                        lastName: fields.lastName,
                        email: fields.email,
                        phone: fields.phone,
                    }}
                    onChange={handleFieldChange}
                    errors={errors}
                />
            </div>

            {/* Course Selection */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Course Selection</h3>

                <LevelSelect
                    levels={COURSE_LEVELS}
                    currentValue={fields.currentLevelId}
                    desiredValue={fields.desiredLevelId}
                    onCurrentChange={handleCurrentLevelChange}
                    onDesiredChange={handleDesiredLevelChange}
                    errors={{
                        currentLevelId: errors.currentLevelId,
                        desiredLevelId: errors.desiredLevelId,
                    }}
                />

                <div className={styles.selectionRow}>
                    <TeacherSelect
                        availableTeachers={availableTeachers}
                        value={fields.teacherId}
                        onChange={handleTeacherChange}
                        currentLevelId={fields.currentLevelId}
                        desiredLevelId={fields.desiredLevelId}
                        error={errors.teacherId}
                    />
                    <DateSelect
                        availableDates={availableDates}
                        value={fields.startDate}
                        onChange={handleDateChange}
                        error={errors.startDate}
                    />
                </div>
            </div>

            <button type="submit" className={styles.submitButton}>
                Submit Registration
            </button>
        </form>
    );
}
