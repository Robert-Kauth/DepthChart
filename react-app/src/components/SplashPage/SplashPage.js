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
        <div className={styles.splash}>
            <div className={styles.wrapper}>
                <div className={styles.titleContainer}>
                    <p className={styles.title}>Welcome to DepthChart</p>
                    <div className={styles.subtitleContainer}>
                        <p className={styles.subtitle1}>Don't be BEAT.</p>
                        <p className={styles.subtitle2}>Avoid the SACKO!</p>
                    </div>
                </div>
                <button className={styles.button} onClick={showSignupForm}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}
