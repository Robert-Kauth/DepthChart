import React from "react";
import Servers from "../Servers";
import Messages from "../Messages";
import Friends from "../Friends";
import MessageFeed from "../Messages/MessageFeed";

import styles from "./Home.module.css";
// className={styles. }

export default function Home() {
    return (
        <div className={styles.homeWrapper}>
            <div className={styles.homeLeft}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.messages}>
                    <Messages />
                </div>
            </div>
            <div className={styles.feed}>
                <MessageFeed />
            </div>
            <div className={styles.homeRight}>
                <div className={styles.friends}>
                    <Friends />
                </div>
            </div>
        </div>
    );
}
