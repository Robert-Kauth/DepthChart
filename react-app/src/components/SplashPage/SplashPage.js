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
            <main className={styles.main}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Welcome to DepthChart</h1>
                    <div className={styles.subtitleContainer}>
                        <h2 className={styles.subtitle1}>Don't be BEAT.</h2>
                        <h3 className={styles.subtitle2}>Avoid the SACKO!</h3>
                    </div>
                </div>
                <button className={styles.button} onClick={showSignupForm}>
                    Sign Up
                </button>
            </main>
        </div>
    );
}
