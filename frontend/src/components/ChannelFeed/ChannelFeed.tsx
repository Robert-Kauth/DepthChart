import { useEffect } from "react";
import { loadAllChannelMessages } from "../../store/messages";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import CreateMessageBar from "../CreateMessageBar";
import ChannelMessages from "../ChannelMessages";
import FeedTitleBar from "../FeedTitleBar";

export default function ChannelFeed() {
    const dispatch = useAppDispatch();

    // ChannelFeed is only rendered by Server once a channel is selected
    const selectedChannel = useAppSelector(
        (state) => state.channels.channel
    )!;
    const channelMsgs = useAppSelector((state) => state.messages.channel);

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
            <CreateMessageBar channel_id={selectedChannel.id} />
        </>
    );
}
