import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadAllUserMessages } from "../../store/messages";
import MessageFeedCard from "./MessageFeedCard";
import Title from "../Title";

import styles from "./MessageFeed.module.css";
// className={styles. }

export default function MessageFeed({ message }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(loadAllUserMessages(user.id));
    }, [dispatch, user.id]);

    return (
        <>
            <Title className={styles.title} title="All Messages" />
            <MessageFeedCard message={message} />
        </>
    );
}
