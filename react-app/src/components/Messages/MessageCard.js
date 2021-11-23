import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMessagedUsers } from "../../store/messages";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }) {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users);
    const messagedUser = useSelector((state) => state.messages.messaged_users);

    let recipient_id;
    if (messagedUser) {
        recipient_id = messagedUser[message.id].recipient_ids;
    }

    let sender_id;
    if (messagedUser) {
        sender_id = messagedUser[message.id].sender_id;
    }
    console.log(sender_id, "sender Id");

    useEffect(() => {
        dispatch(getMessagedUsers(message.id));
    }, [dispatch, message.id]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.channelInfo}>
                <div className={styles.name}>
                    {recipient_id && users && recipient_id !== currentUser.id
                        ? users[recipient_id].username
                        : users[sender_id].username}
                </div>
                <div className={styles.iconWrapper}>
                    {recipient_id &&
                    users &&
                    recipient_id !== currentUser.id ? (
                        <img
                            className={styles.icon}
                            src={users[recipient_id].avatar}
                            alt="user avatar"
                        />
                    ) : (
                        <img
                            src={users[sender_id].avatar}
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