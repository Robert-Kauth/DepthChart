import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllChannelMessages } from "../../store/messages";

import ChannelMessages from "../ChannelMessages";

import styles from "./ChannelFeed.module.css";
// className={styles. }

export default function ChannelFeed() {
    const dispatch = useDispatch();

    const selectedChannel = useSelector((state) => state.channels.channel);

    useEffect(() => {
        dispatch(loadAllChannelMessages(selectedChannel.id));
    }, [dispatch, selectedChannel]);
    return (
        <>
            <p className={styles.title}>Channel Name Goes HERE</p>
            <div className={styles.messages}>
                <ChannelMessages />
            </div>
        </>
    );
}
