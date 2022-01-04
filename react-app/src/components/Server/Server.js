import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Main from "../Main";
import Servers from "../Servers";
import Channels from "../Channels";
import ChannelFeed from "../ChannelFeed";
import Friends from "../Friends";

import styles from "./Server.module.css";
// className={styles. }

export default function Server() {
    const { serverId } = useParams();

    const selectedChannel = useSelector((state) => state.channels.channel);

    return (
        <div className={styles.background}>
            <div className={styles.contentWrapper}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.main}>
                    {selectedChannel ? (
                        <Main
                            card={<Channels serverId={serverId} />}
                            feed={<ChannelFeed />}
                        />
                    ) : (
                        <Main card={<Channels serverId={serverId} />} />
                    )}
                </div>
                <div className={styles.friends}>
                    <Friends />
                </div>
            </div>
        </div>
    );
}
