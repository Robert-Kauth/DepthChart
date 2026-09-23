import { useState, useEffect, MouseEvent } from "react";

import ChatButton from "../ChatButton/ChatButton";
import UserInfo from "../UserInfo";
import FollowButton from "../FollowButton";
import type { User } from "../../types";

import styles from "./FriendCard.module.css";
// className={styles. }

export default function FriendCard({ user }: { user: User }) {
    const [selectedUser, setSelectedUser] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const updateSelected = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;
        setSelectedId(target.value);
        window.localStorage.setItem("id", JSON.stringify(+target.value));
        setSelectedUser(!selectedUser);
    };

    useEffect(() => {
        let hideButton: ReturnType<typeof setTimeout> | undefined;
        if (selectedUser) {
            hideButton = setTimeout(() => {
                setSelectedUser(!selectedUser);
            }, 5000);
        }

        return () => {
            clearTimeout(hideButton);
        };
    }, [selectedUser]);

    return (
        <>
            <button
                onClick={updateSelected}
                className={styles.selectFriend}
                value={user.id}>
                <UserInfo user={user} />
            </button>
            {selectedUser && selectedId && (
                <div className={styles.buttons}>
                    <ChatButton user={user} />
                    <FollowButton />
                </div>
            )}
        </>
    );
}
