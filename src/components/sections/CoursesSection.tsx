import type { CourseLevel } from '@/types';
import styles from './CoursesSection.module.css';

interface CoursesSectionProps {
    levels: CourseLevel[];
}

export default function CoursesSection({ levels }: CoursesSectionProps) {
    return (
        <section id="courses" className={styles.section} aria-labelledby="courses-heading">
            <div className={styles.inner}>
                <h2 id="courses-heading" className={styles.heading}>
                    Our Courses
                </h2>
                <div className={styles.grid}>
                    {levels.map((level) => (
                        <article key={level.id} className={styles.card} aria-labelledby={`course-${level.id}`}>
                            <h3 id={`course-${level.id}`} className={styles.cardName}>
                                {level.name}
                            </h3>
                            <p className={styles.cardNameLT}>{level.nameLT}</p>
                            <p className={styles.cardDescription}>{level.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
