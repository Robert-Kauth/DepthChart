import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Title from "../Title";
import FriendCard from "../FriendCard";
import { loadUsers } from "../../store/users";

import styles from "./Friends.module.css";
// className={styles. }

export default function Friends() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users.all);

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    let friendCards;
    if (users && sessionUser) {
        friendCards = Object.values(users).reduce((acc, user) => {
            if (user.id !== sessionUser.id) {
                acc.push(user);
            }
            return acc;
        }, []);
    }

    if (!friendCards) {
        return null;
    }

    return (
        <div className={styles.friendsWrapper}>
            <Title title={"Users"} />
            {friendCards.map((user) => (
                <FriendCard key={user.id} user={user} />
            ))}
        </div>
    );
}
