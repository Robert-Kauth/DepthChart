import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from "react";
import { mdiArrowLeftCircle } from "@mdi/js";
import { Icon } from "@mdi/react";

import UserInfo from "../UserInfo";
import { loadUsers } from "../../store/users";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { User } from "../../types";

import styles from "./NewMessageForm.module.css";
import CreateMessageBar from "../CreateMessageBar/CreateMessageBar";
// className={styles. }

export default function NewMessageForm() {
    const dispatch = useAppDispatch();

    const sessionUser = useAppSelector((state) => state.session.user)!;
    const users = useAppSelector((state) => state.users.all)!;

    const [userId, setUserId] = useState<string | null>(null);

    const otherUsers = Object.values(users).reduce<User[]>((a, user) => {
        if (user.id !== sessionUser.id) {
            a.push(user);
        }
        return a;
    }, []);

    let selectedUser: User | undefined;
    if (userId) {
        selectedUser = users[+userId];
    }

    const selectedUserId = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setUserId(e.target.value);
    };

    const sendMessage = (e: FormEvent) => {};

    const goBack = (e: MouseEvent) => {
        e.preventDefault();
        setUserId(null);
    };

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    return (
        <form className={styles.form} onSubmit={sendMessage}>
            <fieldset className={styles.field}>
                <legend className={styles.legend}>Create New Message</legend>
                {!userId && (
                    <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel}>
                            Message User:
                        </label>
                        <select
                            className={styles.select}
                            onChange={selectedUserId}>
                            <option>--Please select a user to message--</option>
                            {otherUsers &&
                                otherUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                {userId && (
                    <>
                        <div className={styles.userInfo}>
                            <div className={styles.user}>
                                <UserInfo user={selectedUser} />
                            </div>
                            <div className={styles.button}>
                                <button className={styles.styledButton} onClick={goBack}>
                                    <Icon className={styles.styledIcon}
                                        path={mdiArrowLeftCircle}
                                        size={1}
                                    />
                                </button>
                            </div>
                        </div>
                        <CreateMessageBar recipient_id={userId} />
                    </>
                )}
            </fieldset>
        </form>
    );
}
