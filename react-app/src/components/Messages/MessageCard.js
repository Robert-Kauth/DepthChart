import React from "react";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>{message.content}</div>
            <div></div>
        </div>
    );
}
