import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Servers from "../Servers";
import Main from "../Main";
import Messages from "../Messages";
import MessageFeed from "../MessageFeed";
import Friends from "../Friends";

import { loadMessagesBetween } from "../../store/messages";

import styles from "./Home.module.css";
// className={styles. }

export default function Home() {
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.messages.between);
    const selectedMsg = useSelector((state) => state.messages.message);

    let user1_id;
    let user2_id;
    if (selectedMsg) {
        user1_id = selectedMsg.recipient_id;
        user2_id = selectedMsg.sender_id;
    }

    useEffect(() => {
        dispatch(loadMessagesBetween(user1_id, user2_id));
    }, [dispatch, user1_id, user2_id]);

    return (
        <div className={styles.homeBackground}>
            <div className={styles.contentWrapper}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.main}>
                    {selectedMsg && messages ? (
                        <Main
                            card={<Messages />}
                            feed={
                                <MessageFeed
                                    messages={messages}
                                    recipient_id={user1_id}
                                    sender_id={user2_id}
                                />
                            }
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
