import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Servers from "../Servers";
import Main from "../Main";
import Messages from "../Messages";
import MessageFeed from "../MessageFeed";
import Friends from "../Friends";

import styles from "./Home.module.css";
import { loadAllUserMessages } from "../../store/messages";
// className={styles. }

export default function Home() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const selectedMsg = useSelector((state) => state.messages.message);

    useEffect(() => {
        dispatch(loadAllUserMessages(sessionUser.id));
    }, [dispatch, sessionUser]);

    return (
        <div className={styles.homeBackground}>
            <div className={styles.contentWrapper}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.main}>
                    {selectedMsg ? (
                        <Main
                            card={<Messages />}
                            feed={<MessageFeed message={selectedMsg} />}
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
