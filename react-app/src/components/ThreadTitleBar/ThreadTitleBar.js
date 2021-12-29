import React from "react";

import UserInfo from "../UserInfo";

import styles from "./ThreadTitleBar.module.css";
// className={styles. }

export default function ThreadTitleBar(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <UserInfo user={props.user} />
            </div>
            <div className={styles.text}>
                {`This is the beginning of your direct message history with ${props.user.username}`}
            </div>
        </div>
    );
}
