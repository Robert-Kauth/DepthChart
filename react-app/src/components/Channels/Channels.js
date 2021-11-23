import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChannelCard from "./ChannelCard";
import AddChannelModal from "./AddChannelModal";
import { loadChannels } from "../../store/channels";

import styles from "./Channels.module.css";
// className={styles. }

export default function Channels({ serverId }) {
    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channels);
    const servers = useSelector((state) => state.servers);

    let serverChannels;
    if (channels) {
        serverChannels = Object.values(channels).reduce((a, channel) => {
            if (channel.server_id === +serverId) {
                a.push(channel);
            }
            return a;
        }, []);
    }

    const currentServer = servers[serverId];

    useEffect(() => {
        dispatch(loadChannels());
    }, [dispatch]);

    return (
        <div className={styles.channelsWrapper}>
            <p className={styles.title}>Channels</p>
            {serverChannels.length ? (
                serverChannels.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} />
                ))
            ) : (
                <div className={styles.msgContainer}>
                    <p className={styles.msg}>No Channels Exist</p>
                    <p className={styles.msg}>Click + to create one</p>
                </div>
            )}
            <div>
                <AddChannelModal currentServer={currentServer} />
            </div>
        </div>
    );
}
