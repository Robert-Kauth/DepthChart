import React, { useState } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiPlusBox } from "@mdi/js";

import { Modal } from "../../Context";
import CreateChannel from "./CreateChannel";

import styles from "./AddChannelModal.module.css";
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
export default function AddChannelModal({ currentServer }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Button onClick={() => setShowModal(true)}>
                <StyledIcon path={mdiPlusBox} size={1} />
            </Button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateChannel
                        currentServer={currentServer}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}
