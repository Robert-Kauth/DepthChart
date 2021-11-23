import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MessageCard from "./MessageCard";
import { loadAllUserMessages } from "../../store/messages";

import styles from "./Messages.module.css";
// className={styles. }

export default function Messages() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const messages = useSelector((state) => state.messages);

    useEffect(() => {
        dispatch(loadAllUserMessages(user.id));
    }, [dispatch, user.id]);

    return (
        <div className={styles.wrapper}>
            <p className={styles.messages}>Messages</p>
            {messages &&
                Object.values(messages).map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
        </div>
    );
}
