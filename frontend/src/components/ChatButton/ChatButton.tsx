import { loadAllChats } from "../../store/chats";

import { showModal, setCurrentModal } from "../../store/modal";
import { loadUser } from "../../store/users";
import { useAppDispatch } from "../../store/hooks";
import type { User } from "../../types";

import Chat from "../Chat";

import styles from "./ChatButton.module.css";
// className={styles. }

export default function ChatButton({ user }: { user: User }) {
    const dispatch = useAppDispatch();

    const showChat = () => {
        dispatch(loadUser(user.id));
        dispatch(loadAllChats(user.id));
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
