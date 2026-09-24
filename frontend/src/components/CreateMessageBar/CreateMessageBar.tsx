import { useState, ChangeEvent, MouseEvent } from "react";
import { Icon } from "@mdi/react";
import { mdiSendCircle } from "@mdi/js";

import Errors from "../Errors";

import { createMessage } from "../../store/messages";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./CreateMessageBar.module.css";
// className={styles. }

interface CreateMessageBarProps {
    recipient_id?: number | string;
    channel_id?: number;
}

export default function CreateMessageBar(props: CreateMessageBarProps) {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const sessionUser = useAppSelector((state) => state.session.user)!;

    const updateMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors([]);
        setMessage(e.target.value);
    };

    const handleSend = async (e: MouseEvent) => {
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
                <button className={styles.styledButton} onClick={handleSend}>
                    <Icon className={styles.styledIcon} path={mdiSendCircle} size={1} />
                </button>
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
