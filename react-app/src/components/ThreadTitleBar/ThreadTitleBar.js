import React from "react";

import UserInfo from "../UserInfo";
import FollowButton from "../FollowButton";
import MutualServers from "../MutualServers";

import styles from "./ThreadTitleBar.module.css";
// className={styles. }

export default function ThreadTitleBar({ user }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <UserInfo user={user} />
            </div>
            <div className={styles.text}>
                {`This is the beginning of your direct message history with ${user.username}`}
            </div>
            <div className={styles.lower}>
                <MutualServers user={user} />
                <FollowButton user={user} />
            </div>
        </div>
    );
}
