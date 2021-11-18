import React from "react";
import SignupModal from "../Signup";

import styles from "./SplashPage.module.css";
// className={styles. }

export default function SplashPage() {
    return (
        <div className={styles.splash}>
            <div className={styles.modalWrapper}>
                <SignupModal />
            </div>
        </div>
    );
}
