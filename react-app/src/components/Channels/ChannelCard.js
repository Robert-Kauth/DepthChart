import React, { useState } from "react";

import EditChannelModal from "./EditChannelModal";

import styles from "./ChannelCard.module.css";
// className={styles. }

export default function ChannelCard({ channel }) {
    const [selection, setSelection] = useState();

    const displayMessages = () => {
        setSelection();
        setSelection(channel.id);
    };

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.selectButton}
                onClick={displayMessages}
                value={channel.id}>
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
        </div>
    );
}
