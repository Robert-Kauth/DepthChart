import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadChannels } from "../../store/channels";
import { loadUsers } from "../../store/users";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }) {
    const dispatch = useDispatch();
    console.log(message);

    const channels = useSelector((state) => state.channels);
    const users = useSelector((state) => state.users);

    const toUserId = message.recipients[0];
    console.log(toUserId);

    useEffect(() => {
        dispatch(loadChannels());
        dispatch(loadUsers());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.channelInfo}>
                <div className={styles.name}>
                    {channels ? channels[message.channel_id]?.name : null}
                </div>
                <div className={styles.iconWrapper}>
                    {channels ? (
                        <img
                            className={styles.icon}
                            src={channels[message.channel_id]?.icon}
                            alt="channel icon"
                        />
                    ) : (
                        <img
                            src="https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/nfl.png"
                            alt="default nfl logo"
                        />
                    )}
                </div>
            </div>
            <div className={styles.messageInfo}>
                <div className={styles.content}>{message.content}</div>
                <div className={styles.updated}>{message.updated_at}</div>
            </div>
        </div>
    );
}
