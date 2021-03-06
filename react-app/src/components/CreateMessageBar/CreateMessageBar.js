import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiSendCircle } from "@mdi/js";

import Errors from "../Errors";

import { createMessage } from "../../store/messages";

import styles from "./CreateMessageBar.module.css";
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

export default function CreateMessageBar(props) {
    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);

    const updateMessage = (e) => {
        setErrors([]);
        setMessage(e.target.value);
    };

    const handleSend = async (e) => {
        e.preventDefault();

        if (props.recipient_id) {
            const new_user_message = {
                content: message,
                sender_id: sessionUser.id,
                recipient_id: props.recipient_id,
            };
            const errors = await dispatch(createMessage(new_user_message));
            if (errors) {
                setErrors(errors);
            } else {
                setMessage("");
            }
        } else if (props.channel_id) {
            const new_channel_message = {
                content: message,
                channel_id: props.channel_id,
                sender_id: sessionUser.id,
            };
            const errors = await dispatch(createMessage(new_channel_message));
            if (errors) {
                setErrors(errors);
            } else {
                setMessage("");
            }
        } else setErrors(["Something went wrong please try again"]);
    };

    return (
        <div className={styles.wrapper}>
            {errors.length > 0 && <Errors errors={errors} />}
            <div className={styles.newMessage}>
                <Button onClick={handleSend}>
                    <StyledIcon path={mdiSendCircle} size={1} />
                </Button>
                <input
                    className={styles.messageInput}
                    type="text"
                    value={message}
                    onChange={updateMessage}
                />
            </div>
        </div>
    );
}
