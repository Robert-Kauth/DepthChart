import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "../../Context";
import EditServer from "./EditServer";

import styles from "./ServerEditModal.module.css";

export default function ServerEditModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    return (
        <div className={styles.modalContainer}>
            {sessionUser && (
                <button
                    className={styles.modalButton}
                    onClick={() => setShowModal(true)}>
                    Edit Server
                </button>
            )}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditServer setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}
