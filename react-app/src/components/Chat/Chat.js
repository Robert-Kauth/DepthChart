import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import styles from "./Chat.module.css";
// className={styles. }

let socket;
export default function Chat() {
    const user = useSelector((state) => state.session.user);

    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    useEffect(() => {
        socket = io();

        socket.on("chat", (chat) => {
            setMessages((messages) => [...messages, chat]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();

        socket.emit("chat", { user: user.email, msg: chatInput });
        setChatInput("");
    };

    return (
        <div>
            <div className={styles.messagesWrapper}>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form className={styles.chatWrapper} onSubmit={sendChat}>
                <input value={chatInput} onChange={updateChatInput} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
