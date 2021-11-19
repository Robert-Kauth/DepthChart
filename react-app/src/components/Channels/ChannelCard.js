import React from "react";

import styles from "./ChannelCard.module.css";
// className={styles. }

export default function ChannelCard({ channel }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.iconWrapper}>
                <img src={channel.icon} alt="Channel icon" />
            </div>
            <div className={styles.name}>{channel.name}</div>
            <div className={styles.topic}>{channel.topic}</div>
        </div>
    );
}
