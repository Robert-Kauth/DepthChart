import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Errors from "../Errors";
import UserInfo from "../UserInfo";
import { loadUsers, loadUser } from "../../store/users";

import styles from "./NewMessageForm.module.css";
// className={styles. }

export default function NewMessageForm() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.all);
    const selectedUser = useSelector((state) => state.users.user);

    const [errors, setErrors] = useState([]);
    const [userId, setUserId] = useState("");
    const [content, setContent] = useState("");

    const selectedUserId = (e) => {
        e.preventDefault();

        setUserId(e.target.value);
    };

    const setMessage = (e) => {
        const err = [];
        if (content.length <= 5) {
            err.push("Message must be at least 5 characters long");
            setErrors(err);
        } else {
            setErrors([]);
            setContent(e.target.value);
        }
    };

    useEffect(() => {
        dispatch(loadUsers());

        if (userId) {
            dispatch(loadUser(userId));
        }
    }, [dispatch, userId]);

    return (
        <form className={styles.form}>
            <legend>Create New Message</legend>
            <Errors errors={errors} />
            <div className={styles.selectWrapper}>
                <label>Message User</label>
                <select className={styles.select} onChange={selectedUserId}>
                    <option>--Please select a user to message</option>
                    {users &&
                        Object.values(users).map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                </select>
            </div>
            <div className={styles.userInfo}>
                {userId && <UserInfo user={selectedUser} />}
            </div>
            <div className={styles.contentWrapper}>
                <textarea
                    className={styles.content}
                    value={content}
                    onChange={setMessage}
                />
            </div>
        </form>
    );
}
