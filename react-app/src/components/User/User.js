import React from "react";

import Avatar from "./Avatar";

import styles from "./User.module.css";
// className={styles. }

export default function User(props) {
    return (
        <div className={styles.wrapper}>
            <div>{props.user.username}</div>
            <Avatar user={props.user} />
        </div>
    );
}
