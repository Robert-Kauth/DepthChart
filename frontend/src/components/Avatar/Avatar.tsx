import type { User } from "../../types";

import styles from "./Avatar.module.css";
// className={styles. }

export default function Avatar({ user }: { user: User }) {
    return (
        <div className={styles.wrapper}>
            <img
                className={styles.avatarImg}
                src={user.avatar}
                alt="User Avatar"
            />
        </div>
    );
}
