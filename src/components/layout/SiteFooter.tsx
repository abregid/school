import styles from './SiteFooter.module.css';

export default function SiteFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.contact}>
                    <h2>Contact Us</h2>
                    <p>
                        <strong>Email:</strong>{' '}
                        <a href="mailto:info@lietuviskalba.lt">info@lietuviskalba.lt</a>
                    </p>
                    <p>
                        <strong>Phone:</strong>{' '}
                        <a href="tel:+37052345678">+370 5 234 5678</a>
                    </p>
                    <p>Gedimino pr. 9, Vilnius, LT-01103, Lithuania</p>
                </div>
                <div className={styles.copyright}>
                    <p>
                        &copy; {new Date().getFullYear()} Lietuvių Kalba Language School.
                        <br />
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
