import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MessageCard from "../MessageCard";
import Title from "../Title";

import { loadUsers } from "../../store/users";
import { loadAllUserMessages } from "../../store/messages";
import { loadMessage } from "../../store/messages";

import styles from "./Messages.module.css";

// className={styles. }

export default function Messages() {
    const dispatch = useDispatch();

    const user_id = useSelector((state) => state.session.user.id);
    const messages = useSelector((state) => state.messages.all);
    console.log(messages, "messages from state");

    useEffect(() => {
        dispatch(loadAllUserMessages(user_id));
    }, [dispatch, user_id]);

    const selectMsg = (e, message) => {
        e.preventDefault();
        dispatch(loadMessage(message.id));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Title title={"Direct Messages"} />
            </div>
            {messages &&
                Object.values(messages).map((message) => (
                    <button
                        className={styles.button}
                        key={message.id}
                        value={message.id}
                        onClick={(e) => selectMsg(e, message)}>
                        <MessageCard message={message} />
                    </button>
                ))}
        </div>
    );
}
