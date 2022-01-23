import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ChatButton from "../ChatButton/ChatButton";
import UserInfo from "../UserInfo";
import FollowButton from "../FollowButton";

import styles from "./FriendCard.module.css";
// className={styles. }

export default function FriendCard({ user }) {
    const sessionUser = useSelector((state) => state.session.user);

    const [selectedUser, setSelectedUser] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const updateSelected = (e) => {
        e.preventDefault();

        if (user.id !== sessionUser.id) {
            setSelectedId(e.target.value);
            setSelectedUser(!selectedUser);
        }
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
                onClick={(e) => updateSelected(e)}
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
