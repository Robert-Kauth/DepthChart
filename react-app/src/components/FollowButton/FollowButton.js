import React from "react";

import styles from "./FollowButton.module.css";
// className={styles. }

export default function FollowButton() {
    const setFollow = () => {};

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={setFollow}>
                Follow
            </button>
        </div>
    );
}
