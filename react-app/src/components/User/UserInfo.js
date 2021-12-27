import React from "react";

import Avatar from "./Avatar";

import styles from "./User.module.css";
// className={styles. }

export default function UserInfo(props) {
    return (
        <div className={styles.wrapper}>
            <Avatar user={props.user} />
            <div>{props.user.username}</div>
        </div>
    );
}
