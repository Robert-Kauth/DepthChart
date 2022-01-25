import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MessageFeedCard from "../MessageFeedCard";
import Title from "../Title";
import CreateMessageBar from "../CreateMessageBar";

import { loadAllUserMessages } from "../../store/messages";

import styles from "./MessageFeed.module.css";
// className={styles. }

export default function MessageFeed({ message }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(loadAllUserMessages(user.id));
    }, [dispatch, user.id]);

    let other_user;
    if (message.recipient_id === user.id) {
        other_user = message.sender_id;
    } else {
        other_user = message.recipient_id;
    }

    return (
        <div className={styles.wrapper}>
            <Title title="User Messages" />
            <MessageFeedCard message={message} />
            <CreateMessageBar recipient_id={other_user} />
        </div>
    );
}
