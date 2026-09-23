import { useEffect } from "react";

import Servers from "../Servers";
import Main from "../Main";
import Messages from "../Messages";
import MessageFeed from "../MessageFeed";
import Friends from "../Friends";

import { loadAllUserMessages } from "../../store/messages";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./Home.module.css";
// className={styles. }

export default function Home() {
    const dispatch = useAppDispatch();

    // Home is only rendered by App when a user is logged in
    const sessionUser = useAppSelector((state) => state.session.user)!;
    const messages = useAppSelector((state) => state.messages.between);

    useEffect(() => {
        dispatch(loadAllUserMessages(sessionUser.id));
    }, [dispatch, sessionUser.id]);

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
