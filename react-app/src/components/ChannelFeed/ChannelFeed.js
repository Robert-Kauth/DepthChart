import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllChannelMessages } from "../../store/messages";

import CreateMessage from "../CreateMessage";
import ChannelMessages from "../ChannelMessages";
import FeedTitleBar from "../FeedTitleBar";

import styles from "./ChannelFeed.module.css";
// className={styles. }

export default function ChannelFeed() {
    const dispatch = useDispatch();

    const selectedChannel = useSelector((state) => state.channels.channel);
    const channelMsgs = useSelector((state) => state.messages.channel);

    useEffect(() => {
        dispatch(loadAllChannelMessages(selectedChannel.id));
    }, [dispatch, selectedChannel]);

    return (
        <>
            {selectedChannel && <FeedTitleBar channel={selectedChannel} />}
            {channelMsgs &&
                Object.values(channelMsgs).map((message) => (
                    <ChannelMessages key={message.id} message={message} />
                ))}
            <CreateMessage />
        </>
    );
}
