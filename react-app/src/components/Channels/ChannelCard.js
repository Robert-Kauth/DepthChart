import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllChannelMessages } from "../../store/messages";

import styles from "./ChannelCard.module.css";
// className={styles. }

export default function ChannelCard({ channel }) {
    const dispatch = useDispatch();

    const selectedChannel = useSelector((state) => state.channels.channel);

    useEffect(() => {
        if (selectedChannel) {
            dispatch(loadAllChannelMessages(selectedChannel.id));
        }
    }, [dispatch, selectedChannel]);

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
