import React from "react";

import FriendCard from "./FriendCard";

import styles from "./Friends.module.css";
// className={styles. }

export default function Friends() {
    return (
        <div className={styles.friendsWrapper}>
            <div className={styles.titleWrapper}>
                <p className={styles.title}>Friends</p>
            </div>
            <div>
                <FriendCard />
            </div>
        </div>
    );
}
