import React, { useState } from "react";
import { Modal } from "../../Modal";
import { useSelector } from "react-redux";
import SignupForm from "./SignupForm";
import styles from "./SignupModal.module.css";
// className={styles. }

export default function SignupModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>Welcome to DepthChart</p>
                <div className={styles.subtitleContainer}>
                    <p className={styles.subtitle1}>Don't be BEAT.</p>
                    <p className={styles.subtitle2}>Avoid the SACKO!</p>
                </div>
            </div>
            <div className={styles.modalContainer}>
                {!sessionUser && (
                    <button
                        className={styles.modalButton}
                        onClick={() => setShowModal(true)}>
                        Sign Up
                    </button>
                )}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SignupForm />
                    </Modal>
                )}
            </div>
        </div>
    );
}
