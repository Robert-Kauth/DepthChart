import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import styles from "./SignupForm.module.css";
// className={styles. }

export default function SignupForm() {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            }
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <form className={styles.form} onSubmit={onSignUp}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Sign Up</legend>
                    {errors.map((error, ind) => (
                        <div>
                            <legend>Errors:</legend>
                            <div key={ind}>{error}</div>
                        </div>
                    ))}
                    <div>
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            onChange={updateUsername}
                            value={username}></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={updateEmail}
                            value={email}></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={updatePassword}
                            value={password}></input>
                    </div>
                    <div>
                        <label>Repeat Password</label>
                        <input
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
                </fieldset>
            </form>
        </div>
    );
}
