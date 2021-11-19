import React from "react";
import Servers from "../Servers";
import Channels from "../Channels";
import { useParams } from "react-router-dom";

import styles from "./Server.module.css";
// className={styles. }

export default function Server() {
    const { serverId } = useParams();

    return (
        <div className={styles.wrapper}>
            <div className={styles.servers}>
                <Servers />
            </div>
            <div className={styles.channels}>
                <Channels serverId={serverId} />
            </div>
        </div>
    );
}
