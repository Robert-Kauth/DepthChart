import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addChat, loadAllChats } from "../../store/chats";

import { hideModal } from "../../store/modal";

import styles from "./Chat.module.css";
// className={styles. }

let socket;

export default function Chat() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const user = useSelector((state) => state.users.user);
    const allChats = useSelector((state) => state.chat.all);

    // const [errors, setErrors] = useState([]);
    const [chatRecipient, setChatRecipient] = useState(null);
    const [localMessages, setLocalMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [newChat, setNewChat] = useState(null);

    useEffect(() => {
        //open socket connection
        //create websocket
        socket = io();

        // listens for chat events
        socket.on("chat", (chat) => {
            // When chat is received, add it to local message state
            setLocalMessages((localMessages) => [...localMessages, chat]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (newChat) {
            dispatch(addChat(newChat));
        }
        if (user) {
            dispatch(loadAllChats(sessionUser.id));
        }
    }, [dispatch, newChat, sessionUser, user]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();

        // Emits chat event setting session users as user and msg as chatInput
        socket.emit("chat", { user: sessionUser.username, msg: chatInput });

        if (chatInput) {
            const new_chat = {
                content: chatInput,
                sender_id: sessionUser.id,
                recipient_id: user.id,
            };
            setNewChat(new_chat);
        }
        setChatInput("");
    };

    const hideChat = () => {
        dispatch(hideModal());
    };

    let dbChats;
    if (allChats) {
        dbChats = Object.values(allChats).map((chat, idx) => {
            if (chat.sender_recipient[sessionUser.id]) {
                return (
                    <div key={idx}>
                        {`${sessionUser.username}: ${chat.content}`}
                    </div>
                );
            } else {
                return (
                    <div key={idx}>{`${user.username}: ${chat.content}`}</div>
                );
            }
        });
    }

    return (
        user && (
            <div className={styles.wrapper}>
                <div className={styles.messages}>
                    {dbChats ? dbChats.map((chat) => chat) : null}
                    {localMessages.map((message, idx) => (
                        <div key={idx}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </div>
                <form className={styles.chat} onSubmit={sendChat}>
                    <input value={chatInput} onChange={updateChatInput} />
                    <button type="submit">Send</button>
                </form>
                <button onClick={hideChat}>Close Chat</button>
            </div>
        )
    );
}
