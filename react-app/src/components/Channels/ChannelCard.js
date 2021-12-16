import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EditChannelModal from "./EditChannelModal";

import { loadAllChannelMessages } from "../../store/messages";

import styles from "./ChannelCard.module.css";
// className={styles. }

export default function ChannelCard({ channel }) {
    const dispatch = useDispatch();

    const [selectedChannel, setSelectedChannel] = useState();

    const selectChannel = () => {
        setSelectedChannel(channel.id);
    };

    useEffect(() => {
        if (selectedChannel) {
            dispatch(loadAllChannelMessages(selectedChannel));
        }
    }, [dispatch, selectedChannel]);

    return (
        <div className={styles.wrapper} onClick={selectChannel}>
            <div className={styles.selectButton} value={channel.id}>
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
