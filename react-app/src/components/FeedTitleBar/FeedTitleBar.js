import React from "react";

import UserInfo from "../UserInfo";
import FollowButton from "../FollowButton";
import MutualServers from "../MutualServers";

import styles from "./FeedTitleBar.module.css";
// className={styles. }

export default function FeedTitleBar(props) {
    return (
        <div className={styles.wrapper}>
            <UserInfo user={props.user} />
            <div className={styles.text}>
                {`This is the beginning of your direct message history with ${props.user.username}`}
            </div>
            <div className={styles.lower}>
                <MutualServers user={props.user} />
                <FollowButton user={props.user} />
            </div>
        </div>
    );
}
