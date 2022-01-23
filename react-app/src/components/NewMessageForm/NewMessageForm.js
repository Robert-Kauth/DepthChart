import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdiArrowLeftCircle } from "@mdi/js";
import styled from "styled-components";
import Icon from "@mdi/react";

import Errors from "../Errors";
import UserInfo from "../UserInfo";
import { loadUsers, loadUser } from "../../store/users";

import styles from "./NewMessageForm.module.css";
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

    const users = useSelector((state) => state.users.all);
    const selectedUser = useSelector((state) => state.users.user);

    const [errors, setErrors] = useState([]);
    const [userId, setUserId] = useState(null);
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

    const goBack = (e) => {
        e.preventDefault();
        setUserId(null);
    };

    useEffect(() => {
        dispatch(loadUsers());

        if (userId) {
            dispatch(loadUser(userId));
        }
    }, [dispatch, userId]);

    return (
        <form className={styles.form}>
            <fieldset className={styles.field}>
                <legend className={styles.legend}>Create New Message</legend>
                <Errors errors={errors} />
                {!userId && (
                    <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel}>
                            Message User:
                        </label>
                        <select
                            className={styles.select}
                            onChange={selectedUserId}>
                            <option>--Please select a user to message</option>
                            {users &&
                                Object.values(users).map((user) => (
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
                        <div className={styles.contentWrapper}>
                            <label className={styles.contentLabel}>
                                Message:
                            </label>
                            <textarea
                                className={styles.content}
                                value={content}
                                onChange={setMessage}
                            />
                        </div>
                    </>
                )}
            </fieldset>
        </form>
    );
}
