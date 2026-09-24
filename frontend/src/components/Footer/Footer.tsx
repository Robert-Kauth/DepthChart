import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.name}>Designed by: Robert Kauth</p>
            <div className={styles.linkedIn}>
                <a
                    className={styles.linkedInLink}
                    href="https://www.linkedin.com/in/robert-kauth-043370133/"
                    target="_blank">
                    <img
                        className={styles.logo}
                        src="https://antinote.s3.us-west-1.amazonaws.com/linkedin-logo.png"
                        alt="LinkedIn logo"
                    />
                </a>
            </div>
            <div className={styles.github}>
                <a
                    className={styles.githubLink}
                    href="https://github.com/Robert-Kauth"
                    target="_blank">
                    <img
                        src="https://antinote.s3.us-west-1.amazonaws.com/Octocat.png"
                        alt="GitHub logo"
                    />
                </a>
            </div>
        </footer>
    );
}
