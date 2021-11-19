import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChannelCard from "./ChannelCard";
import AddChannel from "./AddChannel";
import { loadChannels } from "../../store/channels";

import styles from "./Channels.module.css";
// className={styles. }

export default function Channels({ serverId }) {
    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channels);

    let serverChannels;
    if (channels) {
        serverChannels = Object.values(channels).reduce((a, channel) => {
            if (channel.server_id === +serverId) {
                a.push(channel);
            }
            return a;
        }, []);
    }

    useEffect(() => {
        dispatch(loadChannels());
    }, [dispatch]);

    return (
        <div className={styles.channelsWrapper}>
            {serverChannels.length ? (
                serverChannels.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} />
                ))
            ) : (
                <AddChannel />
            )}
        </div>
    );
}
