'use client';

import type { CourseLevel } from '@/types';
import styles from './LevelSelect.module.css';

interface LevelSelectProps {
    levels: CourseLevel[];
    currentValue: string;
    desiredValue: string;
    onCurrentChange: (value: string) => void;
    onDesiredChange: (value: string) => void;
    errors?: { currentLevelId?: string; desiredLevelId?: string };
}

export default function LevelSelect({
    levels,
    currentValue,
    desiredValue,
    onCurrentChange,
    onDesiredChange,
    errors = {},
}: LevelSelectProps) {
    return (
        <div className={styles.row}>
            {/* Current Level */}
            <div className={styles.field}>
                <label htmlFor="currentLevel" className={styles.label}>
                    Current Level<span className={styles.required} aria-hidden="true"> *</span>
                </label>
                <select
                    id="currentLevel"
                    className={`${styles.select}${errors.currentLevelId ? ` ${styles.selectError}` : ''}`}
                    value={currentValue}
                    onChange={(e) => onCurrentChange(e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.currentLevelId ? 'currentLevel-error' : undefined}
                >
                    <option value="" disabled>
                        Select your current level
                    </option>
                    {levels.map((level) => (
                        <option key={level.id} value={level.id}>
                            {level.name} ({level.nameLT})
                        </option>
                    ))}
                </select>
                {errors.currentLevelId && (
                    <span id="currentLevel-error" role="alert" className={styles.errorText}>
                        {errors.currentLevelId}
                    </span>
                )}
            </div>

            {/* Desired Level */}
            <div className={styles.field}>
                <label htmlFor="desiredLevel" className={styles.label}>
                    Desired Level<span className={styles.required} aria-hidden="true"> *</span>
                </label>
                <select
                    id="desiredLevel"
                    className={`${styles.select}${errors.desiredLevelId ? ` ${styles.selectError}` : ''}`}
                    value={desiredValue}
                    onChange={(e) => onDesiredChange(e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.desiredLevelId ? 'desiredLevel-error' : undefined}
                >
                    <option value="" disabled>
                        Select your desired level
                    </option>
                    {levels.map((level) => (
                        <option key={level.id} value={level.id}>
                            {level.name} ({level.nameLT})
                        </option>
                    ))}
                </select>
                {errors.desiredLevelId && (
                    <span id="desiredLevel-error" role="alert" className={styles.errorText}>
                        {errors.desiredLevelId}
                    </span>
                )}
            </div>
        </div>
    );
}
