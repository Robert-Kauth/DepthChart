import React from "react";

import styles from "./FriendCard.module.css";
// className={styles. }

export default function FriendCard({ users }) {
    return (
        <div>
            {users &&
                Object.values(users).map((user) => (
                    <div className={styles.friendWrapper} key={user.id}>
                        <p className={styles.name}>{user.username}</p>
                        <div className={styles.imgContainer}>
                            <img src={user.avatar} alt="user avatar" />
                        </div>
                    </div>
                ))}
        </div>
    );
}
