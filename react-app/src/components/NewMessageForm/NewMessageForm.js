import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdiArrowLeftCircle } from "@mdi/js";
import styled from "styled-components";
import Icon from "@mdi/react";

import UserInfo from "../UserInfo";
import { loadUsers } from "../../store/users";

import styles from "./NewMessageForm.module.css";
import CreateMessageBar from "../CreateMessageBar/CreateMessageBar";
// className={styles. }

const Button = styled.button`
    background-color: #014421;
    color: #029e7e;
    margin: 0 5px;
    height: 74px;
    padding-top: 5px;
    border: 2px solid darkgreen;
    border-radius: 2px;
    box-shadow: 0 0 5px lightgreen;
    &:hover {
        background-color: #0bda51;
        color: #014421;
    }
`;

const StyledIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
`;

export default function NewMessageForm() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users.all);

    const [userId, setUserId] = useState(null);

    const otherUsers = Object.values(users).reduce((a, user) => {
        if (user.id !== sessionUser.id) {
            a.push(user);
        }
        return a;
    }, []);

    let selectedUser;
    if (userId) {
        selectedUser = users[userId];
    }

    const selectedUserId = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
    };

    const sendMessage = (e) => {};

    const goBack = (e) => {
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
                                <Button onClick={goBack}>
                                    <StyledIcon
                                        path={mdiArrowLeftCircle}
                                        size={1}
                                    />
                                </Button>
                            </div>
                        </div>
                        <CreateMessageBar recipient_id={userId} />
                    </>
                )}
            </fieldset>
        </form>
    );
}
