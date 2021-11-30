import React, { useState } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiCircleEditOutline } from "@mdi/js";

import { Modal } from "../../Context";
import EditChannel from "./EditChannel";

const Button = styled.button`
    background-color: rgb(1, 68, 33);
    color: rgb(2, 158, 126);
    margin: 0px;
    padding-top: 5px;
    border: 2px solid darkgreen;
    border-radius: 2px;
    box-shadow: lightgreen 0px 0px 5px;
    &:hover {
        background-color: rgb(1, 68, 33);
        color: #0bda51;
    }
`;

const StyledIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
`;
export default function EditChannelModal({ channel }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Button onClick={() => setShowModal(true)}>
                <StyledIcon path={mdiCircleEditOutline} size={1} />
            </Button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChannel
                        channel={channel}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </>
    );
}
