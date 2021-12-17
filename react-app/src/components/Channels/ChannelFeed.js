import React from "react";
import ChannelMessages from "./ChannelMessages";

import styles from "./ChannelFeed.module.css";
// className={styles. }

export default function ChannelFeed() {
    return (
        <>
            <p className={styles.title}>Channel Name Goes HERE</p>
            <div className={styles.messages}>
                <ChannelMessages />
            </div>
        </>
    );
}
