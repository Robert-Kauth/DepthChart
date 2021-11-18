import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "../../Modal";
import LoginForm from "./LoginForm";
import style from "./LoginForm.module.css";

export default function LoginModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className={style.modalContainer}>
            {!sessionUser && (
                <button
                    className={style.modalButton}
                    onClick={() => setShowModal(true)}>
                    Login
                </button>
            )}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}
