import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout";
import LoginModal from "../Login";

import styles from "./NavBar.module.css";
// className={styles. }

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.home}>
                <NavLink
                    to="/"
                    exact={true}
                    className={styles.link}
                    activeClassName={styles.active}>
                    Home
                </NavLink>
            </div>
            <div className={styles.users}>
                <NavLink
                    to="/users"
                    exact={true}
                    className={styles.link}
                    activeClassName={styles.active}>
                    Users
                </NavLink>
            </div>
            <div className={styles.login}>
                <LoginModal />
            </div>
            <div className={styles.logout}>
                <LogoutButton />
            </div>
        </nav>
    );
}
