import { useEffect } from "react";
import { loadAllChannelMessages } from "../../store/messages";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Channel } from "../../types";

import styles from "./ChannelCard.module.css";
// className={styles. }

export default function ChannelCard({ channel }: { channel: Channel }) {
    const dispatch = useAppDispatch();

    const selectedChannel = useAppSelector((state) => state.channels.channel);

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
