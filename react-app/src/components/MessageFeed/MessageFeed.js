import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUsers } from "../../store/users";
import { loadAllUserMessages } from "../../store/messages";
import MessageFeedCard from "./MessageFeedCard";

import styles from "./MessageFeed.module.css";
// className={styles. }

export default function MessageFeed() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const messages = useSelector((state) => state.messages.all_messages);

    useEffect(() => {
        dispatch(loadUsers());
        dispatch(loadAllUserMessages(user.id));
    }, [dispatch, user.id]);
    return (
        <>
            <p className={styles.title}>All Messages</p>
            <div className={styles.messages}>
                {messages &&
                    Object.values(messages).map((message) => (
                        <MessageFeedCard key={message.id} message={message} />
                    ))}
            </div>
        </>
    );
}
