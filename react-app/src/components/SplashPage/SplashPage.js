import React from "react";
import { useDispatch } from "react-redux";

import SignupForm from "../Signup";

import { showModal, setCurrentModal } from "../../store/modal";

import styles from "./SplashPage.module.css";
// className={styles. }

export default function SplashPage() {
    const dispatch = useDispatch();

    const showSignupForm = () => {
        dispatch(setCurrentModal(SignupForm));
        dispatch(showModal());
    };

    return (
        <div className={styles.background}>
            <section className={styles.section}>
                <h1 className={styles.title}>Welcome to DepthChart</h1>
                <h2 className={styles.subtitle1}>Don't be BEAT</h2>
                <div className={styles.buttonWrapper}>
                    <button className={styles.button} onClick={showSignupForm}>
                        Sign Up
                    </button>
                </div>
                <h3 className={styles.subtitle2}>Avoid the SACKO</h3>
            </section>
        </div>
    );
}
