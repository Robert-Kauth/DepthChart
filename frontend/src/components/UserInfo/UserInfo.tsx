import Avatar from "../Avatar";
import type { User } from "../../types";

import styles from "./UserInfo.module.css";
// className={styles. }

export default function UserInfo({ user }: { user?: User | null }) {
    if (!user) {
        return null;
    }
    return (
        <div className={styles.wrapper}>
            <Avatar user={user} />
            <div className={styles.username}>{user.username}</div>
        </div>
    );
}
