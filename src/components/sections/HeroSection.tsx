import type { SchoolInfo } from '@/types';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
    school: SchoolInfo;
}

export default function HeroSection({ school }: HeroSectionProps) {
    return (
        <section className={styles.section} aria-labelledby="hero-heading">
            <div className={styles.inner}>
                <h1 id="hero-heading" className={styles.heading}>
                    {school.name}
                </h1>
                <p className={styles.description}>{school.description}</p>
                <ul className={styles.highlights} aria-label="School highlights">
                    {school.highlights.map((highlight, index) => (
                        <li key={index} className={styles.highlightItem}>
                            {highlight}
                        </li>
                    ))}
                </ul>
                <a href="#register" className={styles.cta}>
                    Register for a Course
                </a>
            </div>
        </section>
    );
}
