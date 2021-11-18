import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login, demoLogin } from "../../store/session";

import styles from "./LoginForm.module.css";
// className={styles. }

export default function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

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
        setShowModal(false);
        history.push("/");
    };

    const handleDemoLogin = async (e) => {
        e.preventDefault();
        await dispatch(demoLogin());
        setShowModal(false);
        history.push("/");
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <form className={styles.form}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Login</legend>
                    <div>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={updateEmail}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword}
                        />
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.button}
                                type="submit"
                                onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit" onClick={handleDemoLogin}>
                                Demo Login
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
