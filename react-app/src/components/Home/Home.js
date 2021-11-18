import React from "react";
import Servers from "../Servers";
import Messages from "../Messages";

import styles from "./Home.module.css";
// className={styles. }
export default function Home() {
    return (
        <div className={styles.homeWrapper}>
            <div className={styles.servers}>
                <Servers />
            </div>
            <div className={styles.messages}>
                <Messages />
            </div>
        </div>
    );
}
