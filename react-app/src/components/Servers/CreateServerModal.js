import React, { useState } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiPlusBox } from "@mdi/js";

import { Modal } from "../../Modal";
import CreateServerForm from "./CreateServerForm";

const Button = styled.button`
    border-radius: 5px;
    background-color: aliceblue;
    margin: 0;
    padding-top: 5px;
`;
export default function CreateServerModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <Button onClick={() => setShowModal(true)}>
                <Icon path={mdiPlusBox} size={1} />
            </Button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateServerForm setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}
