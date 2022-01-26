import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }) {
    const currentUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users.all);

    let recipient_id;
    let sender_id;
    if (message) {
        recipient_id = message.recipient_id;
        sender_id = message.sender_id;
    }
    if (!users) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.iconWrapper}>
                {recipient_id === currentUser.id ? (
                    <img
                        className={styles.icon}
                        src={users[sender_id]?.avatar}
                        alt="sender logo"
                    />
                ) : (
                    <img
                        className={styles.icon}
                        src={users[recipient_id]?.avatar}
                        alt="recipient avatar"
                    />
                )}
            </div>
            <div className={styles.name}>
                {recipient_id && users && recipient_id !== currentUser.id
                    ? users[recipient_id]?.username
                    : users[sender_id]?.username}
            </div>
        </div>
    );
}
