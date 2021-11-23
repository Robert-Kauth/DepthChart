import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, demoLogin } from "../../store/session";

import styles from "./LoginForm.module.css";
// className={styles. }

export default function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const handleDemoLogin = async (e) => {
        e.preventDefault();
        await dispatch(demoLogin());
    };

    const updateEmail = (e) => {
        setErrors([]);
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setErrors([]);
        setPassword(e.target.value);
    };

    if (user) {
        setShowModal(false);
        return <Redirect to="/" />;
    }

    return (
        <div>
            <form className={styles.form}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Login</legend>
                    <ul className={styles.errors}>
                        {errors.map((error, ind) => (
                            <li className={styles.error} key={ind}>
                                {error}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.inputs}>
                        <div className={styles.emailWrapper}>
                            <div className={styles.emailLabelWrapper}>
                                <label
                                    htmlFor="email"
                                    className={styles.emailLabel}>
                                    Email:
                                </label>
                            </div>
                            <div className={styles.emailInputWrapper}>
                                <input
                                    autoComplete="email"
                                    className={styles.email}
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={updateEmail}
                                />
                            </div>
                        </div>
                        <div className={styles.passwordWrapper}>
                            <div className={styles.passwordLabelWrapper}>
                                <label
                                    className={styles.passwordLabel}
                                    htmlFor="password">
                                    Password:
                                </label>
                            </div>
                            <div className={styles.passwordInputWrapper}>
                                <input
                                    autoComplete="current-password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={updatePassword}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <div className={styles.loginButtonContainer}>
                            <button
                                className={styles.loginButton}
                                type="submit"
                                onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                        <div className={styles.demoLoginButtonContainer}>
                            <button
                                type="submit"
                                className={styles.demoButton}
                                onClick={handleDemoLogin}>
                                Demo Login
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
