import React, { useState } from "react";
import { useSelector } from "react-redux";

import Chat from "../Chat";

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

    return (
        <>
            <button
                onClick={updateSelected}
                className={styles.selectFriend}
                value={user.id}>
                <p className={styles.name} value={user.id}>
                    {user.username}
                </p>
                <div className={styles.imgContainer} value={user.id}>
                    <img src={user.avatar} alt="user avatar" />
                </div>
            </button>
            {selectedUser && selectedId ? <Chat /> : null}
        </>
    );
}
