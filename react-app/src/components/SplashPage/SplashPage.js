import React from "react";
import LoginForm from "../Login";
import SignupForm from "../Signup";

import styles from "./SplashPage.module.css";
// className={styles. }

export default function SplashPage() {
    return (
        <div className={styles.splash}>
            <h1>Hello From SplashPage</h1>
            <LoginForm />
            <SignupForm />
        </div>
    );
}
