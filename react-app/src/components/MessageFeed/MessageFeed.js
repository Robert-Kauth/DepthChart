import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MessageFeedCard from "../MessageFeedCard";
import Title from "../Title";
import CreateMessage from "../CreateMessage";

import { loadAllUserMessages } from "../../store/messages";

import styles from "./MessageFeed.module.css";
// className={styles. }

export default function MessageFeed({ message }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(loadAllUserMessages(user.id));
    }, [dispatch, user.id]);

    return (
        <div className={styles.wrapper}>
            <Title title="All Messages" />
            <MessageFeedCard message={message} />
            <CreateMessage />
        </div>
    );
}
