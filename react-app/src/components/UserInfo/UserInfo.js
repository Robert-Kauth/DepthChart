import React from "react";

import Avatar from "../Avatar";

import styles from "./UserInfo.module.css";
// className={styles. }

export default function UserInfo({ user }) {
    if (!user) {
        return null;
    }
    return (
        <div className={styles.wrapper}>
            <Avatar user={user} />
            <div className={styles.username}>{user.username}</div>
        </div>
    );
}
