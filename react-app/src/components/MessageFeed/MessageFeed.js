import React from "react";
import { useSelector } from "react-redux";

import MessageFeedCard from "../MessageFeedCard";
import Title from "../Title";
import CreateMessageBar from "../CreateMessageBar";
import FeedTitleBar from "../FeedTitleBar";

import styles from "./MessageFeed.module.css";
// className={styles. }

export default function MessageFeed({ messages }) {
    const user2 = useSelector((state) => state.users.user);

    return (
        <div className={styles.wrapper}>
            <Title title="User Messages" />
            <FeedTitleBar user={user2} />
            {messages &&
                Object.values(messages).map((message) => (
                    <MessageFeedCard key={message.id} message={message} />
                ))}
            {user2 && <CreateMessageBar recipient_id={user2.id} />}
        </div>
    );
}
