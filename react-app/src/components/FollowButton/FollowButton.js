import React from "react";

import styles from "./FollowButton.module.css";
// className={styles. }

export default function FollowButton() {
    return (
        <div className={styles.wrapper}>
            <button className={styles.button}>Follow</button>
        </div>
    );
}
