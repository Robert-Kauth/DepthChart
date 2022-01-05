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

    const sessionUser = useSelector((state) => state.session.user);
    const messages = useSelector((state) => state.messages.all_messages);

    useEffect(() => {
        dispatch(loadUsers());
        dispatch(loadAllUserMessages(sessionUser.id));
    }, [dispatch, sessionUser]);

    const selectMsg = async (e, message) => {
        e.preventDefault();
        if (message) {
            await dispatch(loadMessage(message.id));
        }
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
