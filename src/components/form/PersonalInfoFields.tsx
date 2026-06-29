'use client';

import type { RegistrationFormState, FormErrors } from '@/types';
import styles from './PersonalInfoFields.module.css';

type PersonalFields = Pick<
    RegistrationFormState,
    'firstName' | 'lastName' | 'email' | 'phone'
>;

interface PersonalInfoFieldsProps {
    values: PersonalFields;
    onChange: (field: keyof PersonalFields, value: string) => void;
    errors: FormErrors;
}

export default function PersonalInfoFields({
    values,
    onChange,
    errors,
}: PersonalInfoFieldsProps) {
    return (
        <div className={styles.fieldGroup}>
            {/* First Name */}
            <div className={styles.field}>
                <label htmlFor="firstName" className={styles.label}>
                    First Name<span className={styles.required} aria-hidden="true"> *</span>
                </label>
                <input
                    id="firstName"
                    type="text"
                    className={`${styles.input}${errors.firstName ? ` ${styles.inputError}` : ''}`}
                    value={values.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    autoComplete="given-name"
                />
                {errors.firstName && (
                    <span id="firstName-error" role="alert" className={styles.errorText}>
                        {errors.firstName}
                    </span>
                )}
            </div>

            {/* Last Name */}
            <div className={styles.field}>
                <label htmlFor="lastName" className={styles.label}>
                    Last Name<span className={styles.required} aria-hidden="true"> *</span>
                </label>
                <input
                    id="lastName"
                    type="text"
                    className={`${styles.input}${errors.lastName ? ` ${styles.inputError}` : ''}`}
                    value={values.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    autoComplete="family-name"
                />
                {errors.lastName && (
                    <span id="lastName-error" role="alert" className={styles.errorText}>
                        {errors.lastName}
                    </span>
                )}
            </div>

            {/* Email */}
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                    Email<span className={styles.required} aria-hidden="true"> *</span>
                </label>
                <input
                    id="email"
                    type="email"
                    className={`${styles.input}${errors.email ? ` ${styles.inputError}` : ''}`}
                    value={values.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    autoComplete="email"
                />
                {errors.email && (
                    <span id="email-error" role="alert" className={styles.errorText}>
                        {errors.email}
                    </span>
                )}
            </div>

            {/* Phone */}
            <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>
                    Phone<span className={styles.required} aria-hidden="true"> *</span>
                </label>
                <input
                    id="phone"
                    type="tel"
                    className={`${styles.input}${errors.phone ? ` ${styles.inputError}` : ''}`}
                    value={values.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    autoComplete="tel"
                    placeholder="+370 600 12345"
                />
                {errors.phone && (
                    <span id="phone-error" role="alert" className={styles.errorText}>
                        {errors.phone}
                    </span>
                )}
            </div>
        </div>
    );
}
