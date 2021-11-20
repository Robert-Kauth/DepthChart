import React, { useState } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiCircleEditOutline } from "@mdi/js";

import { Modal } from "../../Modal";
import EditChannel from "./EditChannel";

import styles from "./EditChannelModal.module.css";
// className={styles. }

const Button = styled.button`
    border-radius: 5px;
    background-color: aliceblue;
    margin: 0;
    padding-top: 5px;
`;
export default function EditChannelModal({ channel }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={styles.wrapper}>
            <Button onClick={() => setShowModal(true)}>
                <Icon path={mdiCircleEditOutline} size={1} />
            </Button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChannel
                        channel={channel}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}