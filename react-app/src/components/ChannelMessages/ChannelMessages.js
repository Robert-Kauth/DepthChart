import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../store/users";
import UserInfo from "../UserInfo";

import styles from "./ChannelMessages.module.css";
// className={styles. }

export default function ChannelMessages({ message }) {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.all);

    useEffect(() => {
        dispatch(loadUser(message.sender_id));
    }, [dispatch, message]);

    let messageSender;
    if (users) {
        messageSender = users[message.sender_id];
    }

    if (!users) {
        return null;
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <UserInfo user={messageSender} />
            </div>
            <div className={styles.content}>{message.content}</div>
            <div className={styles.updated}>{message.updated_at}</div>
        </div>
    );
}
