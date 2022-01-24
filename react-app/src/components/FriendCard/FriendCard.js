import React, { useState, useEffect } from "react";

import ChatButton from "../ChatButton/ChatButton";
import UserInfo from "../UserInfo";
import FollowButton from "../FollowButton";

import styles from "./FriendCard.module.css";
// className={styles. }

export default function FriendCard({ user }) {
    const [selectedUser, setSelectedUser] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const updateSelected = (e) => {
        e.preventDefault();
        setSelectedId(e.target.value);
        window.localStorage.setItem("id", JSON.stringify(+e.target.value));
        setSelectedUser(!selectedUser);
    };

    useEffect(() => {
        let hideButton;
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
