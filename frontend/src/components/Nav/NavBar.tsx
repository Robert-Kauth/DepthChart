import { NavLink, useNavigate } from "react-router-dom";

import { showModal, setCurrentModal } from "../../store/modal";
import EditServerForm from "../EditServerForm";
import Avatar from "../Avatar";
import { logout } from "../../store/session";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import LoginForm from "../Login";

import styles from "./NavBar.module.css";
// className={styles. }

export default function NavBar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.session.user);

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
        navigate("/");
    };

    return (
        <nav className={styles.nav}>
            <div>
                {user && (
                    <div className={styles.navLeft}>
                        <NavLink
                            end
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.link} ${styles.active}`
                                    : styles.link
                            }>
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
