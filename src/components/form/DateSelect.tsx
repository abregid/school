'use client';

import styles from './DateSelect.module.css';

interface DateSelectProps {
    availableDates: string[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

function formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function DateSelect({
    availableDates,
    value,
    onChange,
    error,
}: DateSelectProps) {
    const isDisabled = availableDates.length === 0;

    return (
        <div className={styles.field}>
            <label htmlFor="startDate" className={styles.label}>
                Start Date<span className={styles.required} aria-hidden="true"> *</span>
            </label>
            <select
                id="startDate"
                className={`${styles.select}${isDisabled ? ` ${styles.selectDisabled}` : ''}${error ? ` ${styles.selectError}` : ''}`}
                value={isDisabled ? '' : value}
                onChange={(e) => onChange(e.target.value)}
                disabled={isDisabled}
                aria-required="true"
                aria-describedby={
                    isDisabled ? 'startDate-hint' : error ? 'startDate-error' : undefined
                }
            >
                <option value="" disabled>
                    Select a start date
                </option>
                {availableDates.map((date) => (
                    <option key={date} value={date}>
                        {formatDate(date)}
                    </option>
                ))}
            </select>
            {isDisabled && (
                <span id="startDate-hint" className={styles.hintText} aria-live="polite">
                    Please select a teacher to see available start dates.
                </span>
            )}
            {!isDisabled && error && (
                <span id="startDate-error" role="alert" className={styles.errorText}>
                    {error}
                </span>
            )}
        </div>
    );
}
