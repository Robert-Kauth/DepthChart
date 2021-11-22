import React, { useState } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiPlusBox } from "@mdi/js";

import { Modal } from "../../Context";
import CreateChannel from "./CreateChannel";

import styles from "./AddChannelModal.module.css";
// className={styles. }

const Button = styled.button`
    border-radius: 5px;
    background-color: aliceblue;
    margin: 0;
    padding-top: 5px;
`;
export default function AddChannelModal({ currentServer }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Button onClick={() => setShowModal(true)}>
                <Icon path={mdiPlusBox} size={1} />
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
