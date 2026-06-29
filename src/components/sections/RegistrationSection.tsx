import RegistrationForm from '@/components/form/RegistrationForm';
import styles from './RegistrationSection.module.css';

export default function RegistrationSection() {
    return (
        <section id="register" className={styles.section} aria-labelledby="register-heading">
            <div className={styles.inner}>
                <h2 id="register-heading" className={styles.heading}>
                    Register for a Course
                </h2>
                <RegistrationForm />
            </div>
        </section>
    );
}
