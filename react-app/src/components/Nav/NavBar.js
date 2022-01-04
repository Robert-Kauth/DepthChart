import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { showModal, setCurrentModal } from "../../store/modal";
import EditServerForm from "../Server/EditServerForm";
import Avatar from "../UserInfo/Avatar";
import { logout } from "../../store/session";

import LoginForm from "../Login";

import styles from "./NavBar.module.css";
// className={styles. }

export default function NavBar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);

    const showLogin = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    const showEditServer = () => {
        dispatch(setCurrentModal(EditServerForm));
        dispatch(showModal());
    };

    const onLogout = () => {
        dispatch(logout());
        history.push("/");
    };

    return (
        <nav className={styles.nav}>
            <div>
                {user && (
                    <div className={styles.navLeft}>
                        <NavLink
                            exact
                            to="/"
                            className={styles.link}
                            activeClassName={styles.active}>
                            Home
                        </NavLink>
                        <button
                            className={styles.editButton}
                            onClick={showEditServer}>
                            Edit Server
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.navRight}>
                {user && <Avatar user={user} />}
                {!user ? (
                    <button className={styles.loginButton} onClick={showLogin}>
                        Log In
                    </button>
                ) : (
                    <button className={styles.logoutButton} onClick={onLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}
