import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

import styles from "./LogoutButton.module.css";
// className={styles. }

export default function LogoutButton() {
    const dispatch = useDispatch();
    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}
