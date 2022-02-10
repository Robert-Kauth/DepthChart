import React from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.dev}>
                <p className={styles.name}>Designed by: Robert Kauth</p>
                <div className={styles.linkedIn}>
                    <Link
                        className={styles.linkedInLink}
                        to={{
                            pathname:
                                "https://www.linkedin.com/in/robert-kauth-043370133/",
                        }}
                        target="_blank">
                        <img
                            className={styles.logo}
                            src="https://antinote.s3.us-west-1.amazonaws.com/linkedin-logo.png"
                            alt="LinkedIn logo"
                        />
                    </Link>
                </div>
                <div className={styles.github}>
                    <Link
                        className={styles.githubLink}
                        to={{ pathname: "https://github.com/Robert-Kauth" }}
                        target="_blank">
                        <img
                            src="https://antinote.s3.us-west-1.amazonaws.com/Octocat.png"
                            alt="GitHub logo"
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
