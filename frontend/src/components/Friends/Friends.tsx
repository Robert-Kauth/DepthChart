import { useEffect } from "react";

import Title from "../Title";
import FriendCard from "../FriendCard";
import { loadUsers } from "../../store/users";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { User } from "../../types";

import styles from "./Friends.module.css";
// className={styles. }

export default function Friends() {
    const dispatch = useAppDispatch();

    const sessionUser = useAppSelector((state) => state.session.user);
    const users = useAppSelector((state) => state.users.all);

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    let friendCards: User[] | undefined;
    if (users && sessionUser) {
        friendCards = Object.values(users).reduce<User[]>((acc, user) => {
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
