import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { showModal, setCurrentModal } from "../../store/modal";
import EditServerForm from "../Server/EditServerForm";
import Avatar from "../UserInfo/Avatar";
import LogoutButton from "../Logout";

import LoginForm from "../Login";

import styles from "./NavBar.module.css";
// className={styles. }

export default function NavBar() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    const showLogin = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    const showEditServer = () => {
        dispatch(setCurrentModal(EditServerForm));
        dispatch(showModal());
    };

    return (
        <nav className={styles.nav}>
            <div>
                {user && (
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
                        <button
                            className={styles.edit}
                            onClick={showEditServer}>
                            Edit Server
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.navRight}>
                <div className={styles.profileAvatar}>
                    {user && <Avatar user={user} />}
                </div>
                {!user ? (
                    <button className={styles.login} onClick={showLogin}>
                        Log In
                    </button>
                ) : (
                    <div className={styles.logout}>
                        <LogoutButton />
                    </div>
                )}
            </div>
        </nav>
    );
}
