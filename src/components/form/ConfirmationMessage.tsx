'use client';

import styles from './ConfirmationMessage.module.css';

interface ConfirmationMessageProps {
    levelName: string;
    teacherName: string;
    startDate: string;
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

export default function ConfirmationMessage({
    levelName,
    teacherName,
    startDate,
}: ConfirmationMessageProps) {
    return (
        <div role="status" aria-live="polite" className={styles.confirmation}>
            <h3 className={styles.heading}>
                🎉 Registration Submitted — Thank You!
            </h3>
            <p>
                We have received your registration. Here is a summary of your selected
                course:
            </p>
            <dl className={styles.summary}>
                <dt>Course Level</dt>
                <dd>{levelName}</dd>

                <dt>Teacher</dt>
                <dd>{teacherName}</dd>

                <dt>Start Date</dt>
                <dd>{formatDate(startDate)}</dd>
            </dl>
        </div>
    );
}
