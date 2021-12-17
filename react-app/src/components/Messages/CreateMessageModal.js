import React, { useState } from "react";

import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiMessagePlus } from "@mdi/js";

import CreateMessage from "./CreateMessage";
import { Modal } from "../../Context";

import styles from "./CreateMessageModal.module.css";
// className={styles. }

const Button = styled.button`
    background-color: #014421;
    color: #029e7e;
    margin: 0;
    padding-top: 5px;
    border: 2px solid darkgreen;
    border-radius: 2px;
    box-shadow: 0 0 5px lightgreen;
    &:hover {
        background-color: #0bda51;
        color: #014421;
    }
`;

const StyledIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
`;

export default function CreateMessageModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={styles.wrapper}>
            <Button
                className={styles.button}
                onClick={() => setShowModal(true)}>
                <StyledIcon path={mdiMessagePlus} size={0.75} />
            </Button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateMessage setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}
