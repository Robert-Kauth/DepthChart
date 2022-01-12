import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showModal, setCurrentModal } from "../../store/modal";
import { loadUser } from "../../store/users";
import Chat from "../Chat";
import UserInfo from "../UserInfo";

import styles from "./FriendCard.module.css";
// className={styles. }

export default function FriendCard({ user }) {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);

    const [selectedUser, setSelectedUser] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const updateSelected = (e) => {
        e.preventDefault();
        //! Might not be needed after changing friends sidebar
        if (user.id !== sessionUser.id) {
            setSelectedId(e.target.value);
            setSelectedUser(!selectedUser);
        }
    };

    const setFollow = () => {};

    const showChat = (e) => {
        e.preventDefault();

        if (selectedId) {
            dispatch(loadUser(selectedId));
        }
        dispatch(setCurrentModal(Chat));
        dispatch(showModal());
    };

    return (
        <>
            <button
                onClick={(e) => updateSelected(e)}
                className={styles.selectFriend}
                value={user.id}>
                <UserInfo user={user} />
            </button>
            {selectedUser && selectedId ? (
                <div className={styles.buttons}>
                    <button className={styles.chatModal} onClick={showChat}>
                        Chat
                    </button>
                    <div className={styles.follow}>
                        <button onClick={setFollow}>Follow</button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
