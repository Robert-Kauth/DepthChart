import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FriendCard from "./FriendCard";
import { loadUsers } from "../../store/users";
import styles from "./Friends.module.css";
// className={styles. }

export default function Friends() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    return (
        <div className={styles.friendsWrapper}>
            <div className={styles.titleWrapper}>
                <p className={styles.title}>Users</p>
            </div>
            {users &&
                Object.values(users).map((user) => (
                    <FriendCard key={user.id} user={user} />
                ))}
        </div>
    );
}
