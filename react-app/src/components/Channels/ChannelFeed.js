import React from "react";
import { useSelector } from "react-redux";
import ChannelMessages from "./ChannelMessages";

import styles from "./ChannelFeed.module.css";
// className={styles. }

export default function ChannelFeed() {
    const channel = useSelector((state) => state.channels);

    return (
        <>
            <p className={styles.title}>Channel Name Goes HERE</p>
            <div className={styles.messages}>
                <ChannelMessages />
            </div>
        </>
    );
}
