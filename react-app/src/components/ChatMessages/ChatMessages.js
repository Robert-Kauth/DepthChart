import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./ChatMessages.module.css";

export default function ChatMessages({ localMessages }) {
    const allChats = useSelector((state) => state.chats.all);
    const sessionUser = useSelector((state) => state.session.user);
    const user = useSelector((state) => state.users.user);
    const [selectedId] = useState(
        JSON.parse(window.localStorage.getItem("id"))
    );

    let dbChats;
    if (allChats) {
        dbChats = Object.values(allChats).map((chat, idx) => {
            if (chat.sender_recipient[sessionUser.id]) {
                return (
                    <div className={styles.chat} key={idx}>
                        {`${sessionUser.username}: ${chat.content}`}
                    </div>
                );
            } else {
                return (
                    <div className={styles.chat} key={idx}>
                        {`${user.username}: ${chat.content}`}
                    </div>
                );
            }
        });
    }
    return (
        <div>
            {dbChats && dbChats.length && localMessages ? (
                <div className={styles.chats}>
                    {selectedId === user.id && dbChats
                        ? dbChats.map((chat) => <div>{chat}</div>)
                        : null}
                    {localMessages.map((message, idx) => (
                        <div className={styles.chat} key={idx}>
                            {`${message.user}: ${message.msg}`}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
