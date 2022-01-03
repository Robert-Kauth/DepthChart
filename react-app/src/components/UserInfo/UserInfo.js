import React from "react";

import Avatar from "./Avatar";

import styles from "./UserInfo.module.css";
// className={styles. }

export default function UserInfo(props) {
    return (
        <div className={styles.wrapper}>
            <Avatar user={props.user} />
            <div className={styles.username}>{props.user.username}</div>
        </div>
    );
}
