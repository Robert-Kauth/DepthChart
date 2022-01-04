import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllChannelMessages } from "../../store/messages";

import NewMessage from "../Messages/NewMessage";
import ChannelMessages from "../ChannelMessages";

import styles from "./ChannelFeed.module.css";
// className={styles. }

export default function ChannelFeed() {
    const dispatch = useDispatch();

    const selectedChannel = useSelector((state) => state.channels.channel);
    const channelMsgs = useSelector((state) => state.messages.channelMsgs);

    useEffect(() => {
        dispatch(loadAllChannelMessages(selectedChannel.id));
    }, [dispatch, selectedChannel]);

    return (
        <>
            <p className={styles.title}>{selectedChannel.name}</p>
            <div className={styles.messages}>
                {channelMsgs &&
                    Object.values(channelMsgs).map((message) => (
                        <ChannelMessages key={message.id} message={message} />
                    ))}
            </div>
            <NewMessage />
        </>
    );
}
