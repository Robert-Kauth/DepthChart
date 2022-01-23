import React from "react";
import { useDispatch } from "react-redux";

import { showModal, setCurrentModal } from "../../store/modal";
import { loadUser } from "../../store/users";

import Chat from "../Chat";

import styles from "./ChatButton.module.css";
// className={styles. }

export default function ChatButton({ user }) {
    const dispatch = useDispatch();

    const showChat = (e) => {
        e.preventDefault();

        if (user) {
            dispatch(loadUser(user.id));
        }
        dispatch(setCurrentModal(Chat));
        dispatch(showModal());
    };
    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={showChat}>
                Chat
            </button>
        </div>
    );
}
