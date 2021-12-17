import React, { useState } from "react";
import { Modal } from "../../Context";
import Chat from "./Chat";

import styles from "./ChatModal.module.css";
// className={styles. }

export default function ChatModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.chatWrapper}>
            {showModal ? (
                <Modal onClose={() => setShowModal(false)}>
                    <Chat setShowModal={setShowModal} />
                </Modal>
            ) : (
                <button onClick={() => setShowModal(!showModal)}>Chat</button>
            )}
        </div>
    );
}
