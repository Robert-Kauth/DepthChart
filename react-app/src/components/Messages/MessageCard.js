import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMessagedUsers } from "../../store/messages";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }) {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);
    const messagedUser = useSelector((state) => state.messages.messaged_users);

    let recipient_id;
    if (messagedUser) {
        recipient_id = messagedUser[message.id].recipient_ids;
    }

    useEffect(() => {
        dispatch(getMessagedUsers(message.id));
    }, [dispatch, message.id]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.channelInfo}>
                <div className={styles.name}>
                    {recipient_id && users
                        ? users[recipient_id].username
                        : null}
                </div>
                <div className={styles.iconWrapper}>
                    {recipient_id && users ? (
                        <img
                            className={styles.icon}
                            src={users[recipient_id].avatar}
                            alt="user avatar"
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
