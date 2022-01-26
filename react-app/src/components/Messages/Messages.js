import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MessageCard from "../MessageCard";
import Title from "../Title";
import CreateMessageButton from "../CreateMessageButton";

import { loadAllUserMessages, loadMessagesBetween } from "../../store/messages";
import { loadMessage } from "../../store/messages";

import styles from "./Messages.module.css";

// className={styles. }

export default function Messages() {
    const dispatch = useDispatch();

    const sessionUserId = useSelector((state) => state.session.user.id);
    const messages = useSelector((state) => state.messages.all);
    const users = useSelector((state) => state.users.all);

    const messagedUserIds = new Set();
    if (messages) {
        Object.values(messages).forEach((message) => {
            let recipient_id = message.recipient_id;
            let sender_id = message.sender_id;
            messagedUserIds.add(recipient_id);
            messagedUserIds.add(sender_id);
        });
    }

    console.log(messagedUserIds, "messagedUsers");
    let messagedUsers;
    if (users) {
        messagedUsers = Object.values(users).reduce((acc, user) => {
            if (messagedUserIds.has(user.id)) acc.push(user);
            return acc;
        }, []);
    }
    console.log(messagedUsers);

    useEffect(() => {
        dispatch(loadAllUserMessages(sessionUserId));
    }, [dispatch, sessionUserId]);

    const selectMsg = (e, message) => {
        e.preventDefault();
        dispatch(loadMessage(message.id)).then(
            dispatch(
                loadMessagesBetween(message.sender_id, message.recipient_id)
            )
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Title title="Direct Messages" />
                <div className={styles.createMessage}>
                    <CreateMessageButton />
                </div>
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
