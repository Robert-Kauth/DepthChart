import React from "react";

import styles from "./Friends.module.css";
// className={styles. }

export default function Friends() {
    return (
        <div className={styles.friendsWrapper}>
            <p className={styles.title}>Hello from friends</p>
        </div>
    );
}
