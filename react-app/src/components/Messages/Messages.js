import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { mdiPlusBox } from "@mdi/js";

import UserInfo from "../UserInfo";
import NewMessageForm from "../NewMessageForm";

import Title from "../Title";
import StyledButton from "../StyledComponents/StyledButton";

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
                <Title
                    className={styles.title}
                    title="Direct Messages"
                    button={
                        <StyledButton form={NewMessageForm} icon={mdiPlusBox} />
                    }
                />
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
