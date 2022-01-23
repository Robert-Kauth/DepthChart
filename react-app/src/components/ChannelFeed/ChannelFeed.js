import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllChannelMessages } from "../../store/messages";

import CreateMessageBar from "../CreateMessageBar";
import ChannelMessages from "../ChannelMessages";
import FeedTitleBar from "../FeedTitleBar";

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
            <CreateMessageBar />
        </>
    );
}
