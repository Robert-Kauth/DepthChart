import React from "react";

import styles from "./Avatar.module.css";
// className={styles. }

export default function Avatar(props) {
    return (
        <div className={styles.wrapper}>
            <img
                className={styles.avatarImg}
                src={props.user.avatar}
                alt="User Avatar"
            />
        </div>
    );
}
