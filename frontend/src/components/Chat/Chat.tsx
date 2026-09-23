import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { io, Socket } from "socket.io-client";
import { addChat, NewChat } from "../../store/chats";

import { hideModal } from "../../store/modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Errors from "../Errors";

import styles from "./Chat.module.css";
// className={styles. }

interface SocketChat {
    user: string;
    msg: string;
}

let socket: Socket;

export default function Chat() {
    const dispatch = useAppDispatch();

    // Chat is only opened from a FriendCard while logged in
    const sessionUser = useAppSelector((state) => state.session.user)!;
    const user = useAppSelector((state) => state.users.user);
    const allChats = useAppSelector((state) => state.chats.all);

    const [errors, setErrors] = useState<string[]>([]);
    const [localMessages, setLocalMessages] = useState<SocketChat[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [newChat, setNewChat] = useState<NewChat | null>(null);
    const [selectedId] = useState<number | null>(
        JSON.parse(window.localStorage.getItem("id") as string)
    );

    useEffect(() => {
        //open socket connection
        //create websocket
        socket = io();

        // listens for chat events
        socket.on("chat", (chat: SocketChat) => {
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
    }, [dispatch, newChat]);

    const updateChatInput = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors([]);
        setChatInput(e.target.value);
    };

    const sendChat = (e: FormEvent) => {
        e.preventDefault();
        if (chatInput) {
            // Emits chat event setting session users as user and msg as chatInput
            socket.emit("chat", { user: sessionUser.username, msg: chatInput });

            const new_chat = {
                content: chatInput,
                sender_id: sessionUser.id,
                recipient_id: user!.id,
            };
            setNewChat(new_chat);
            setChatInput("");
        } else {
            setErrors(["You can not send an empty chat"]);
        }
    };

    const hideChat = () => {
        dispatch(hideModal());
    };

    let dbChats: JSX.Element[] | undefined;
    if (allChats) {
        dbChats = Object.values(allChats).map((chat, idx) => {
            if (chat.sender_id === sessionUser.id) {
                return (
                    <div className={styles.chat} key={idx}>
                        {sessionUser.username}: {chat.content}
                    </div>
                );
            } else {
                return (
                    <div className={styles.chat} key={idx}>
                        {`${user!.username}: ${chat.content}`}
                    </div>
                );
            }
        });
    }

    return (
        <div className={styles.wrapper}>
            {
                <div className={styles.chats}>
                    {user && selectedId === user.id && dbChats
                        ? dbChats.map((chat) => <div>{chat}</div>)
                        : localMessages.map((message, idx) => (
                              <div className={styles.chat} key={idx}>
                                  {`${message.user}: ${message.msg}`}
                              </div>
                          ))}
                </div>
            }
            {errors && <Errors errors={errors} />}
            <form className={styles.form} onSubmit={sendChat}>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.input}
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                </div>
                <div className={styles.inputButtonWrapper}>
                    <button className={styles.inputButton} type="submit">
                        Send
                    </button>
                </div>
            </form>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={hideChat}>
                    Close Chat
                </button>
            </div>
        </div>
    );
}
