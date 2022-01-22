import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiSendCircle } from "@mdi/js";

import { createMessage } from "../../store/messages";

import styles from "./CreateMessage.module.css";
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

export default function CreateMessage({ recipient_id }) {
    const dispatch = useDispatch();

    const [message, setMessage] = useState("");

    const sessionUser = useSelector((state) => state.session.user);

    const updateMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = (e) => {
        e.preventDefault();
        const new_message = {
            content: message,
            sender_id: sessionUser.id,
            recipient_ids: recipient_id,
        };
        dispatch(createMessage(new_message));
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.newMessage}>
                <Button onClick={handleSend}>
                    <StyledIcon path={mdiSendCircle} size={1} />
                </Button>
                <input
                    className={styles.messageInput}
                    type="text"
                    value={message}
                    onChange={updateMessage}
                />
            </form>
        </div>
    );
}
