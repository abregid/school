import styles from './SiteHeader.module.css';

export default function SiteHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <a href="/" className={styles.logo} aria-label="Lietuvių Kalba — home">
                    Lietuvių Kalba
                </a>
                <nav aria-label="Main navigation">
                    <ul className={styles.nav}>
                        <li>
                            <a href="#courses" className={styles.navLink}>
                                Courses
                            </a>
                        </li>
                        <li>
                            <a href="#register" className={styles.navLink}>
                                Register
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
