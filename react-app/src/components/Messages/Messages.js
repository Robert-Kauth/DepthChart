import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MessageCard from "./MessageCard";
import Title from "../Title";

import { loadUsers } from "../../store/users";
import { loadAllUserMessages } from "../../store/messages";

import styles from "./Messages.module.css";

// className={styles. }

export default function Messages() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const messages = useSelector((state) => state.messages.all_messages);

    useEffect(() => {
        dispatch(loadUsers());
        dispatch(loadAllUserMessages(user.id));
    }, [dispatch, user.id]);

    return (
        <div className={styles.wrapper}>
            <Title title="Direct Messages" />
            {messages &&
                Object.values(messages).map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
        </div>
    );
}
