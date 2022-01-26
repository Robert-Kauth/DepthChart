import React from "react";
import { useSelector } from "react-redux";

import Servers from "../Servers";
import Main from "../Main";
import Messages from "../Messages";
import MessageFeed from "../MessageFeed";
import Friends from "../Friends";

import styles from "./Home.module.css";
// className={styles. }

export default function Home() {
    const messages = useSelector((state) => state.messages.between);

    return (
        <div className={styles.homeBackground}>
            <div className={styles.contentWrapper}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.main}>
                    {messages ? (
                        <Main
                            card={<Messages />}
                            feed={<MessageFeed messages={messages} />}
                        />
                    ) : (
                        <Main card={<Messages />} />
                    )}
                </div>
                <div className={styles.friends}>
                    <Friends />
                </div>
            </div>
        </div>
    );
}
