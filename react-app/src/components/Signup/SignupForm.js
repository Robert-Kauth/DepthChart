import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import styles from "./SignupForm.module.css";
// className={styles. }

export default function SignupForm({ setShowModal }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(
                signUp(username, avatar, email, password)
            );
            if (data) {
                setErrors(data);
            } else {
                setShowModal(false);
            }
        }
    };

    const updateUsername = (e) => {
        setErrors([]);
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setErrors([]);
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setErrors([]);
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setErrors([]);
        setRepeatPassword(e.target.value);
    };

    const updateAvatar = (e) => {
        setErrors([]);
        setAvatar(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <form className={styles.form} onSubmit={onSignUp}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Sign Up</legend>
                    <div className={styles.errors}>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.usernameWrapper}>
                            <label className={styles.usernameLabel}>
                                User Name:
                            </label>
                            <input
                                autoComplete="username"
                                type="text"
                                name="username"
                                onChange={updateUsername}
                                value={username}></input>
                        </div>
                        <div className={styles.avatarWrapper}>
                            <label className={styles.avatarLabel}>
                                Upload Avatar:
                            </label>
                            <input
                                autoComplete="url"
                                type="url"
                                name="avatar"
                                onChange={updateAvatar}
                                value={avatar}></input>
                        </div>
                        <div className={styles.emailWrapper}>
                            <label className={styles.emailLabel}>Email:</label>
                            <input
                                autoComplete="email"
                                type="email"
                                name="email"
                                onChange={updateEmail}
                                value={email}></input>
                        </div>
                        <div className={styles.passwordWrapper}>
                            <label className={styles.passwordLabel}>
                                Password:
                            </label>
                            <input
                                autoComplete="new-password"
                                type="password"
                                name="password"
                                onChange={updatePassword}
                                value={password}></input>
                        </div>
                        <div className={styles.passwordWrapper}>
                            <label className={styles.passwordLabel}>
                                Repeat Password:
                            </label>
                            <input
                                autoComplete="new-password"
                                type="password"
                                name="repeat_password"
                                onChange={updateRepeatPassword}
                                value={repeatPassword}
                                required={true}></input>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.button} type="submit">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
