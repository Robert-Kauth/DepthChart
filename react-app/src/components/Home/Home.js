import React from "react";

import Main from "../Main";
import Messages from "../Messages";
import MessageFeed from "../MessageFeed";

import styles from "./Home.module.css";
// className={styles. }

export default function Home() {
    return (
        <div className={styles.homeBackground}>
            <div className={styles.contentWrapper}>
                <div className={styles.main}>
                    <Main>
                        <div className={styles.messages}>
                            <Messages />
                        </div>
                        <div className={styles.feed}>
                            <MessageFeed />
                        </div>
                    </Main>
                </div>
            </div>
        </div>
    );
}
