import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { loadUsers } from "../../store/users";

import styles from "./UsersList.module.css";
// className={styles. }

export default function UsersList() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.users);
    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    if (!users) {
        return null;
    }

    return (
        <div className={styles.listContainer}>
            <h1>User List: </h1>
            <ul>
                {users.length &&
                    Object.values(users).map((user) => (
                        <li key={user.id}>
                            <NavLink to={`/users/${user.id}`}>
                                {user.username}
                            </NavLink>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
