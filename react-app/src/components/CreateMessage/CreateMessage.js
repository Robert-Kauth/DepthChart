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

export default function CreateMessage(props) {
    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);

    const updateMessage = (e) => {
        setMessage(e.target.value);
    };

    //! Will need to check error handling here
    const handleSend = (e) => {
        e.preventDefault();

        if (props.recipient_ids) {
            const new_user_message = {
                content: message,
                sender_id: sessionUser.id,
                recipient_ids: props.recipient_ids,
            };
            dispatch(createMessage(new_user_message));
        } else if (props.channel_id) {
            const new_channel_message = {
                channel_id: props.channel_id,
                sender_id: sessionUser.id,
            };
            dispatch(createMessage(new_channel_message));
        } else setErrors("Something went wrong please try again");
    };

    return (
        <div className={styles.wrapper}>
            <ul className={styles.errors}>
                {errors.map((error, idx) => (
                    <li className={styles.error} key={idx}>
                        {error}
                    </li>
                ))}
            </ul>
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
