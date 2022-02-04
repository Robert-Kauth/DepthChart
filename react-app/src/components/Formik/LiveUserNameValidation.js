import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import StyledIcon from "../StyledComponents/StyledIcon";
import { mdiCheckBold } from "@mdi/js";

import StyledError from "../StyledComponents/StyledError";
import styles from "./Formik.module.css";

// Function that checks if username is already in use
async function validateUsername(username) {
    const res = await fetch(`/api/auth/validate_username/${username}`);

    const { is_username_unique } = await res.json();
    // is_username_unique = false if already in use
    // is_username_unique = username (true) if not
    return is_username_unique;
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
        (didFocus && field.value.trim().length > 2) || meta.touched;

    useEffect(() => {
        let isCurrent;

        if (username.trim() !== prev) {
            isCurrent = true;
        }

        if (username.trim() !== "" && username.trim().length > 2) {
            validateUsername(username).then((validUsername) => {
                if (isCurrent && validUsername) {
                    setFieldValue(props.name, validUsername);
                    setprev(username);
                }
                if (isCurrent && !validUsername) {
                    setFieldError(props.name, "Username is already in use");
                    setprev(field.value.trim());
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [field.value, prev, props.name, setFieldError, setFieldValue, username]);

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
