import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Title from "../Title";
import FriendCard from "../FriendCard";
import { loadUsers } from "../../store/users";
import styles from "./Friends.module.css";
// className={styles. }

export default function Friends() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.all);

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    return (
        <div className={styles.friendsWrapper}>
            <Title title={"Users"} />
            {users &&
                Object.values(users).map((user) => (
                    <FriendCard key={user.id} user={user} />
                ))}
        </div>
    );
}
