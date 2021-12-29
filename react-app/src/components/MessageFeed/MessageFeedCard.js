import React from "react";
import { useSelector } from "react-redux";
import ThreadTitleBar from "../ThreadTitleBar";

import styles from "./MessageFeedCard.module.css";
// className={styles. }

export default function MessageFeedCard({ message }) {
    const currentUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users);
    const messages = useSelector((state) => state.messages.all_messages);

    // Get message recipient
    let recipient_id;
    if (message) {
        recipient_id = message.recipient_ids;
    }

    // Get message sender
    let sender_id;
    if (message) {
        sender_id = message.sender_id;
    }

    // Get individual message that contains content of message
    let indivMessage;
    if (messages) {
        indivMessage = messages[message.message_id];
    }

    // Determine other messaged user
    let otherUser;
    if (sender_id === currentUser.id) {
        otherUser = users[recipient_id];
    } else {
        otherUser = users[sender_id];
    }

    if (!message) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.message}>
                <div>
                    <div>
                        <ThreadTitleBar user={otherUser} />
                    </div>
                </div>
                <div className={styles.name}>
                    {recipient_id !== currentUser.id
                        ? users[recipient_id]?.username
                        : users[sender_id]?.username}
                </div>
                <div className={styles.iconWrapper}>
                    {recipient_id === currentUser.id ? (
                        <img
                            className={styles.icon}
                            src={users[recipient_id]?.avatar}
                            alt="user avatar"
                        />
                    ) : (
                        <img
                            src={users[sender_id]?.avatar}
                            alt="default nfl logo"
                        />
                    )}
                    <div className={styles.messageContent}>
                        <div className={styles.content}>
                            {indivMessage.content}
                        </div>
                        <div className={styles.updated}>
                            {indivMessage.updated_at}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
