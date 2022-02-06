import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import StyledIcon from "../StyledComponents/StyledIcon";
import { mdiCheckBold } from "@mdi/js";

import StyledError from "../StyledComponents/StyledError";
import styles from "./Formik.module.css";

// Function that checks if username is already in use
async function validateSingupUsername(username) {
    const res = await fetch(`/api/auth/validate_signup_username/${username}`);
    const isValid = await res.json();
    return isValid;
}

async function validateLoginUsername(username) {
    const res = await fetch(`/api/auth/validate_login_username/${username}`);
    const isValid = await res.json();
    return isValid;
}

export default function LiveUsernameValidation({ label, ...props }) {
    const {
        values: { username },
        setFieldValue,
        setFieldError,
    } = useFormikContext();

    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const [prev, setprev] = useState("");

    const handleFocus = () => setDidFocus(true);
    const handleBlur = () => setDidFocus(true);

    const showFeedback =
        (didFocus && field.value.toString().trim().length > 2) || meta.touched;

    useEffect(() => {
        let isCurrent;

        if (username.toString().trim() !== prev) {
            isCurrent = true;
        }

        if (
            username.toString().trim() !== "" &&
            username.toString().trim().length > 2 &&
            props.signup
        ) {
            validateSingupUsername(username).then((isValid) => {
                const { is_username_unique } = isValid;
                if (isCurrent && is_username_unique) {
                    setFieldValue(props.name, username);
                    setprev(username);
                }
                if (isCurrent && !is_username_unique) {
                    setFieldError(props.name, "Username is already in use");
                    setprev(field.value.toString().trim());
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [
        field.value,
        prev,
        props.name,
        props.signup,
        setFieldError,
        setFieldValue,
        username,
    ]);

    useEffect(() => {
        let isCurrent;
        if (username.toString().trim() !== prev) {
            isCurrent = true;
        }
        if (
            username.trim() !== "" &&
            username.trim().length > 2 &&
            props.login
        ) {
            validateLoginUsername(username).then((isValid) => {
                const { is_user } = isValid;
                if (isCurrent && is_user) {
                    setFieldValue(props.name, username);
                    setprev(username);
                }
                if (isCurrent && !is_user) {
                    setFieldError(props.name, "Username not Found");
                    setprev(field.value.toString().trim());
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [
        field.value,
        prev,
        props.login,
        props.name,
        setFieldError,
        setFieldValue,
        username,
    ]);

    return (
        <div
            className={`${styles.formControl} ${
                showFeedback
                    ? meta.error
                        ? `${styles.invalid}`
                        : `${styles.valid}`
                    : ""
            }`}>
            <label className={styles.label} htmlFor={props.id || props.name}>
                {label}
            </label>
            <input
                {...props}
                {...field}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={styles.input}
            />
            <div className={styles.feedback}>
                {showFeedback ? (
                    meta.error ? (
                        <StyledError error={meta.error} />
                    ) : (
                        <StyledIcon icon={mdiCheckBold} color="green" />
                    )
                ) : null}
            </div>
        </div>
    );
}
