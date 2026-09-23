import { MouseEvent } from "react";
import { mdiPlusBox } from "@mdi/js";

import UserInfo from "../UserInfo";
import NewMessageForm from "../NewMessageForm";

import Title from "../Title";
import StyledButton from "../StyledComponents/StyledButton";

import { loadMessagesBetween } from "../../store/messages";
import { loadUser } from "../../store/users";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { User } from "../../types";

import styles from "./Messages.module.css";

// className={styles. }

export default function Messages() {
    const dispatch = useAppDispatch();

    const sessionUserId = useAppSelector((state) => state.session.user!.id);
    const messages = useAppSelector((state) => state.messages.all);
    const users = useAppSelector((state) => state.users.all);

    const messagedUserIds = new Set<number | null>();
    if (messages) {
        Object.values(messages).forEach((message) => {
            let recipient_id = message.recipient_id;
            let sender_id = message.sender_id;

            messagedUserIds.add(recipient_id);
            messagedUserIds.add(sender_id);
        });
    }

    let messagedUsers: User[] | undefined;
    if (users) {
        messagedUsers = Object.values(users).reduce<User[]>((acc, user) => {
            if (messagedUserIds.has(user.id) && user.id !== sessionUserId) {
                acc.push(user);
            }
            return acc;
        }, []);
    }

    const selectUser = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        dispatch(loadMessagesBetween(sessionUserId, target.value));
        dispatch(loadUser(target.value));
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
