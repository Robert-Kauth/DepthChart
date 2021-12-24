import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMessagedUsers } from "../../store/messages";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }) {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users);
    const messagedUser = useSelector((state) => state.messages.messaged_users);

    const [userId, setUserId] = useState();

    let recipient_id;
    if (messagedUser && message) {
        recipient_id = messagedUser[message.id].recipient_ids;
    }

    let sender_id;
    if (messagedUser && message) {
        sender_id = messagedUser[message.id].sender_id;
    }

    useEffect(() => {
        if (message) {
            dispatch(getMessagedUsers(message.id));
        }
    }, [dispatch, message, message.id]);

    if (!users) {
        return null;
    }

    const determineUser = () => {
        if (recipient_id === currentUser.id) {
            setUserId(sender_id);
        } else {
            setUserId(recipient_id);
        }
    };

    return (
        <button
            className={styles.wrapper}
            value={userId}
            onClick={determineUser}>
            <div className={styles.iconWrapper}>
                {recipient_id && users && recipient_id !== currentUser.id ? (
                    <img
                        className={styles.icon}
                        src={users[recipient_id]?.avatar}
                        alt="user avatar"
                    />
                ) : (
                    <img
                        className={styles.icon}
                        src={users[sender_id]?.avatar}
                        alt="default nfl logo"
                    />
                )}
            </div>
            <div className={styles.name}>
                {recipient_id && users && recipient_id !== currentUser.id
                    ? users[recipient_id]?.username
                    : users[sender_id]?.username}
            </div>
        </button>
    );
}
