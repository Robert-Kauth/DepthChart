import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Servers from "../Servers";
import Channels from "../Channels";
import ChannelFeed from "../Channels/ChannelFeed";
import Friends from "../Friends";

import styles from "./Server.module.css";
// className={styles. }

export default function Server() {
    const { serverId } = useParams();

    const serverChannelIds = useSelector((state) => state.servers.channel_ids);
    console.log(serverChannelIds, "serverChannelIds");

    return (
        <div className={styles.background}>
            <div className={styles.contentWrapper}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.channels}>
                    <Channels serverId={serverId} />
                </div>
                <div className={styles.feed}>
                    <ChannelFeed />
                </div>
                <div className={styles.friends}>
                    <Friends />
                </div>
            </div>
        </div>
    );
}
