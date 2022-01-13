import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addChat } from "../../store/chat";

import { hideModal } from "../../store/modal";

import styles from "./Chat.module.css";
// className={styles. }

let socket;

export default function Chat() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const chat_recipient = useSelector((state) => state.users.user);

    const [localMessages, setLocalMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [newChat, setNewChat] = useState({});

    useEffect(() => {
        //open socket connection
        //create websocket
        socket = io();

        // listens for chat events
        socket.on("chat", (chat) => {
            // When chat is received, add it to local message state
            setLocalMessages((messages) => [...messages, chat]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    //! might be better to add newChats to user messages?
    //! need to test and see if this allows me to presist instance chat messages
    //! in bottom bar component like gmail
    useEffect(() => {
        dispatch(addChat(newChat));
    }, [dispatch, newChat]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();

        // Emits chat event setting session users as user and msg as chatInput
        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("");

        const new_chat = {
            content: chatInput,
            sender_id: user.id,
            recipient_ids: chat_recipient.id,
        };
        setNewChat(new_chat);
    };

    const hideChat = () => {
        dispatch(hideModal());
    };

    return (
        user && (
            <div>
                <div className={styles.messagesWrapper}>
                    {localMessages.map((message, idx) => (
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
