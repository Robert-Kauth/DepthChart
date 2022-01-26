import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MessageFeedCard from "../MessageFeedCard";
import Title from "../Title";
import CreateMessageBar from "../CreateMessageBar";
import FeedTitleBar from "../FeedTitleBar";

import { loadAllUserMessages } from "../../store/messages";

import styles from "./MessageFeed.module.css";
// className={styles. }

export default function MessageFeed({ messages, sender_id, recipient_id }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users.all);

    useEffect(() => {
        dispatch(loadAllUserMessages(user.id));
    }, [dispatch, user.id]);

    // Determine other messaged user
    let other_user_id;
    let other_user;
    if (recipient_id === user.id) {
        other_user_id = sender_id;
        other_user = users[other_user_id];
    } else {
        other_user_id = recipient_id;
        other_user = users[other_user_id];
    }

    return (
        <div className={styles.wrapper}>
            <Title title="User Messages" />
            <FeedTitleBar user={other_user} />
            {messages &&
                Object.values(messages).map((message) => (
                    <MessageFeedCard key={message.id} message={message} />
                ))}
            <CreateMessageBar recipient_id={other_user_id} />
        </div>
    );
}
