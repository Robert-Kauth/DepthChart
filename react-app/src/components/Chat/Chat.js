import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { hideModal } from "../../store/modal";

import styles from "./Chat.module.css";
// className={styles. }

let socket;

export default function Chat() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    useEffect(() => {
        //open socket connection
        //create websocket
        socket = io();

        // listens for chat events
        socket.on("chat", (chat) => {
            // When chat is received, add it to local message state
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

        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("");
    };

    const hideChat = () => {
        dispatch(hideModal());
    };

    return (
        user && (
            <div>
                <div className={styles.messagesWrapper}>
                    {messages.map((message, idx) => (
                        <div key={idx}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </div>
                <form className={styles.chatWrapper} onSubmit={sendChat}>
                    <input value={chatInput} onChange={updateChatInput} />
                    <button type="submit">Send</button>
                </form>
                <button onClick={hideChat}>Close Chat</button>
            </div>
        )
    );
}
