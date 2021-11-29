import React, { useState } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiSendCircle } from "@mdi/js";

import styles from "./NewMessage.module.css";
// className={styles. }

const Button = styled.button`
    background-color: #014421;
    color: #029e7e;
    margin: 0;
    padding-top: 5px;
    border: 2px solid darkgreen;
    border-radius: 2px;
    &:hover {
        background-color: #0bda51;
        color: #014421;
    }
`;

const StyledIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
`;

export default function NewMessage() {
    const [message, setMessage] = useState("");

    const updateMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = async (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form className={styles.newMessageWrapper}>
                <Button onClick={handleSend}>
                    <StyledIcon path={mdiSendCircle} size={1} />
                </Button>
                <input
                    className={styles.newMessage}
                    type="text"
                    value={message}
                    onChange={updateMessage}
                />
            </form>
        </>
    );
}
