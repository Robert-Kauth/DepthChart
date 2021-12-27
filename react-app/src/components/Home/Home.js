import React from "react";

import Servers from "../Servers";
import Main from "../Main";
import Messages from "../Messages";
import MessageFeed from "../MessageFeed";
import Friends from "../Friends";

import styles from "./Home.module.css";
// className={styles. }

export default function Home() {
    return (
        <div className={styles.homeBackground}>
            <div className={styles.contentWrapper}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.main}>
                    <Main card={<Messages />} feed={<MessageFeed />} />
                </div>
                <div className={styles.friends}>
                    <Friends />
                </div>
            </div>
        </div>
    );
}
