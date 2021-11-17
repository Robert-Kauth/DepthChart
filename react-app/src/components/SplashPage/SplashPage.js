import React from "react";
import LoginModal from "../Login";
import SignupForm from "../Signup";

import styles from "./SplashPage.module.css";
// className={styles. }

export default function SplashPage() {
    return (
        <div className={styles.splash}>
            <LoginModal />
            <SignupForm />
        </div>
    );
}
