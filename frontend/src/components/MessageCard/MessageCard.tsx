import { useAppSelector } from "../../store/hooks";
import type { Message } from "../../types";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }: { message?: Message }) {
    const currentUser = useAppSelector((state) => state.session.user)!;
    const users = useAppSelector((state) => state.users.all);

    let recipient_id: number | null | undefined;
    let sender_id: number | undefined;
    if (message) {
        recipient_id = message.recipient_id;
        sender_id = message.sender_id;
    }
    if (!users) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.iconWrapper}>
                {recipient_id === currentUser.id ? (
                    <img
                        className={styles.icon}
                        src={users[sender_id!]?.avatar}
                        alt="sender logo"
                    />
                ) : (
                    <img
                        className={styles.icon}
                        src={users[recipient_id!]?.avatar}
                        alt="recipient avatar"
                    />
                )}
            </div>
            <div className={styles.name}>
                {recipient_id && users && recipient_id !== currentUser.id
                    ? users[recipient_id]?.username
                    : users[sender_id!]?.username}
            </div>
        </div>
    );
}
