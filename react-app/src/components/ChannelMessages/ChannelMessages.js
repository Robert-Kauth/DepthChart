import React from "react";

import styles from "./ChannelMessages.module.css";
// className={styles. }

export default function ChannelMessages({ message }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>{message.content}</div>
            <div className={styles.updated}>{message.updated_at}</div>
        </div>
    );
}
