'use client';

import type { Teacher } from '@/types';
import styles from './TeacherSelect.module.css';

interface TeacherSelectProps {
    availableTeachers: Teacher[];
    value: string;
    onChange: (value: string) => void;
    currentLevelId: string;
    desiredLevelId: string;
    error?: string;
}

export default function TeacherSelect({
    availableTeachers,
    value,
    onChange,
    currentLevelId,
    desiredLevelId,
    error,
}: TeacherSelectProps) {
    const levelsUnset = !currentLevelId || !desiredLevelId;
    const noTeachers = !levelsUnset && availableTeachers.length === 0;
    const isDisabled = levelsUnset || noTeachers;

    let hint: string | null = null;
    if (levelsUnset) {
        hint = 'Please select your current and desired levels first.';
    } else if (noTeachers) {
        hint = 'No teachers available for this combination — please choose another level.';
    }

    return (
        <div className={styles.field}>
            <label htmlFor="teacher" className={styles.label}>
                Teacher<span className={styles.required} aria-hidden="true"> *</span>
            </label>
            <select
                id="teacher"
                className={`${styles.select}${isDisabled ? ` ${styles.selectDisabled}` : ''}${error ? ` ${styles.selectError}` : ''}`}
                value={isDisabled ? '' : value}
                onChange={(e) => onChange(e.target.value)}
                disabled={isDisabled}
                aria-required="true"
                aria-describedby={
                    hint ? 'teacher-hint' : error ? 'teacher-error' : undefined
                }
            >
                <option value="" disabled>
                    Select a teacher
                </option>
                {availableTeachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                    </option>
                ))}
            </select>
            {hint && (
                <span id="teacher-hint" className={styles.hintText} aria-live="polite">
                    {hint}
                </span>
            )}
            {!hint && error && (
                <span id="teacher-error" role="alert" className={styles.errorText}>
                    {error}
                </span>
            )}
        </div>
    );
}
