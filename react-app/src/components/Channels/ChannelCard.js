import React from "react";

import EditChannelModal from "./EditChannelModal";

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
            <div className={styles.crud}>
                <div className={styles.edit}>
                    <EditChannelModal channel={channel} />
                </div>
            </div>
        </div>
    );
}
