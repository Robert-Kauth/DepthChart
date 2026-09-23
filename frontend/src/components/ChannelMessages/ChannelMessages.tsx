import { useEffect } from "react";
import { loadUser } from "../../store/users";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Message, User } from "../../types";
import UserInfo from "../UserInfo";

import styles from "./ChannelMessages.module.css";
// className={styles. }

export default function ChannelMessages({ message }: { message: Message }) {
    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.users.all);

    useEffect(() => {
        dispatch(loadUser(message.sender_id));
    }, [dispatch, message]);

    let messageSender: User | undefined;
    if (users) {
        messageSender = users[message.sender_id];
    }

    if (!users) {
        return null;
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <UserInfo user={messageSender} />
            </div>
            <div className={styles.content}>{message.content}</div>
            <div className={styles.updated}>{message.updated_at}</div>
        </div>
    );
}
