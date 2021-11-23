import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout";
import LoginModal from "../Login";
import ServerEditModal from "../Server/ServerEditModal";

import styles from "./NavBar.module.css";
// className={styles. }

export default function NavBar() {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <nav className={styles.nav}>
            <div>
                {sessionUser && (
                    <div className={styles.navLeft}>
                        <div className={styles.home}>
                            <NavLink
                                to="/"
                                exact={true}
                                className={styles.link}
                                activeClassName={styles.active}>
                                Home
                            </NavLink>
                        </div>
                        <div className={styles.edit}>
                            <ServerEditModal />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.navRight}>
                {!sessionUser ? (
                    <div className={styles.login}>
                        <LoginModal />
                    </div>
                ) : (
                    <div className={styles.logout}>
                        <LogoutButton />
                    </div>
                )}
            </div>
        </nav>
    );
}
