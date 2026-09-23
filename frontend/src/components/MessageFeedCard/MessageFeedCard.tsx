import { useAppSelector } from "../../store/hooks";
import type { Message } from "../../types";

import styles from "./MessageFeedCard.module.css";
// className={styles. }

export default function MessageFeedCard({ message }: { message?: Message }) {
    const currentUser = useAppSelector((state) => state.session.user)!;
    const users = useAppSelector((state) => state.users.all)!;

    // Get message recipient
    let recipient_id: number | null | undefined;
    if (message) {
        recipient_id = message.recipient_id;
    }

    // Get message sender
    let sender_id: number | undefined;
    if (message) {
        sender_id = message.sender_id;
    }

    if (!message) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.message}>
                <div className={styles.name}>
                    {sender_id === currentUser.id
                        ? users[sender_id]?.username
                        : recipient_id === currentUser.id
                        ? users[sender_id!]?.username
                        : null}
                </div>
                <div className={styles.iconWrapper}>
                    {recipient_id === currentUser.id ? (
                        <img
                            className={styles.icon}
                            src={users[sender_id!]?.avatar}
                            alt="user avatar"
                        />
                    ) : (
                        <img
                            className={styles.icon}
                            src={users[sender_id!]?.avatar}
                            alt="user logo"
                        />
                    )}
                    <div className={styles.messageContent}>
                        <div className={styles.content}>{message.content}</div>
                        <div className={styles.updated}>
                            {message.updated_at}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
