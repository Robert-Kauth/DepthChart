import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserInfo from "../UserInfo";

import Title from "../Title";
import CreateMessageButton from "../CreateMessageButton";

import { loadMessagesBetween } from "../../store/messages";
import { loadUser } from "../../store/users";

import styles from "./Messages.module.css";

// className={styles. }

export default function Messages() {
    const dispatch = useDispatch();

    const sessionUserId = useSelector((state) => state.session.user.id);
    const messages = useSelector((state) => state.messages.all);
    const users = useSelector((state) => state.users.all);

    const messagedUserIds = new Set();
    if (messages) {
        Object.values(messages).forEach((message) => {
            let recipient_id = message.recipient_id;
            let sender_id = message.sender_id;

            messagedUserIds.add(recipient_id);
            messagedUserIds.add(sender_id);
        });
    }

    let messagedUsers;
    if (users) {
        messagedUsers = Object.values(users).reduce((acc, user) => {
            if (messagedUserIds.has(user.id) && user.id !== sessionUserId) {
                acc.push(user);
            }
            return acc;
        }, []);
    }

    const selectUser = (e) => {
        dispatch(loadMessagesBetween(sessionUserId, e.target.value));
        dispatch(loadUser(e.target.value));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.topbar}>
                <Title title="Direct Messages" />
                <CreateMessageButton />
            </div>
            {messagedUsers &&
                messagedUsers.map((user) => (
                    <button
                        className={styles.button}
                        key={user.id}
                        value={user.id}
                        onClick={selectUser}>
                        <UserInfo user={user} />
                    </button>
                ))}
        </div>
    );
}
