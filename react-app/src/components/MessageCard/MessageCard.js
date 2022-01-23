import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMessagedUsers } from "../../store/messages";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }) {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users.all);
    const messagedUser = useSelector((state) => state.messages.messaged_users);

    useEffect(() => {
        dispatch(getMessagedUsers(message.id));
    }, [dispatch, message]);

    let recipient_id;
    if (messagedUser && message) {
        recipient_id = messagedUser[message.id].recipient_id;
    }

    let sender_id;
    if (messagedUser && message) {
        sender_id = messagedUser[message.id].sender_id;
    }

    if (!users) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.iconWrapper}>
                {recipient_id !== currentUser.id ? (
                    <img
                        className={styles.icon}
                        src={users[recipient_id]?.avatar}
                        alt="recipient avatar"
                    />
                ) : (
                    <img
                        className={styles.icon}
                        src={users[sender_id]?.avatar}
                        alt="sender logo"
                    />
                )}
            </div>
            <div className={styles.name}>
                {recipient_id && users && recipient_id !== currentUser.id
                    ? users[recipient_id]?.username
                    : users[sender_id]?.username}
            </div>
        </div>
    );
}
