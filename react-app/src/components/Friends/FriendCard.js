import React, { useState } from "react";
import { useSelector } from "react-redux";

import ChatModal from "../Chat";
import UserInfo from "../UserInfo";

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

    const setFollow = () => {};

    return (
        <>
            <button
                onClick={updateSelected}
                className={styles.selectFriend}
                value={user.id}>
                <UserInfo user={user} />
            </button>
            {selectedUser && selectedId ? (
                <div className={styles.buttons}>
                    <div className={styles.chatModal}>
                        <ChatModal />
                    </div>
                    <div className={styles.follow}>
                        <button onClick={setFollow}>Follow</button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
