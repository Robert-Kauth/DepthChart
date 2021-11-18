import React from "react";
import SignupModal from "../Signup";

import styles from "./SplashPage.module.css";
// className={styles. }

export default function SplashPage() {
    return (
        <div className={styles.splash}>
            <SignupModal />
        </div>
    );
}
