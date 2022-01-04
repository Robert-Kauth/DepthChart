import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../store/users";
import UserInfo from "../UserInfo";

import styles from "./ChannelMessages.module.css";
// className={styles. }

export default function ChannelMessages({ message }) {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.all);
    //! Might be good idea to memoize this selector
    const msgSenderId = useSelector(
        (state) =>
            state.messages.channelMsgs[message.id].message_sender[message.id]
    );
    console.log(msgSenderId, "message sender id");
    useEffect(() => {
        dispatch(loadUser(msgSenderId));
    }, [dispatch, msgSenderId]);

    let messageSender;
    if (users && msgSenderId) {
        messageSender = users[msgSenderId];
    }
    console.log(messageSender, "message sender");

    if (!users && messageSender) {
        return null;
    }
    return (
        <div className={styles.wrapper}>
            <UserInfo user={messageSender} />
            <div className={styles.content}>{message.content}</div>
            <div className={styles.updated}>{message.updated_at}</div>
        </div>
    );
}
