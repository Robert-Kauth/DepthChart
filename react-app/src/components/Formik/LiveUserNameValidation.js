import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

import StyledError from "../StyledComponents/StyledError";
import styles from "./Formik.module.css";

/*
 *Checks if username is available.
 *if true => returns username
 *if false => returns false
 */
async function validateUsername(username) {
    const res = await fetch(`/api/auth/validate_username/${username}`);

    const { is_username_unique } = await res.json();

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
    const [previous, setPrevious] = useState("");

    const handleFocus = () => setDidFocus(true);
    const handleBlur = () => setDidFocus(true);

    const showFeedback =
        (didFocus && field.value.trim().length > 2) || meta.touched;

    useEffect(() => {
        let isCurrent;

        if (username.trim() !== previous) {
            isCurrent = true;
        }

        if (username.trim() !== "" && username.trim().length > 2) {
            validateUsername(username).then((validUsername) => {
                if (isCurrent && validUsername) {
                    setFieldValue(props.name, validUsername);
                    setPrevious(username);
                }
                if (isCurrent && !validUsername) {
                    setFieldError(props.name, "Username is already in use");
                    setPrevious(field.value.trim());
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [
        field.value,
        previous,
        props.name,
        setFieldError,
        setFieldValue,
        username,
    ]);

    return (
        <div
            className={`form-control ${
                showFeedback ? (meta.error ? "invalid" : "valid") : ""
            }`}>
            <label htmlFor={props.id || props.name}>{label}</label>
            {showFeedback ? (
                <div
                    id={`${props.id}-feedback`}
                    aria-live="polite"
                    className="feedback text-sm">
                    {meta.error ? <StyledError error={meta.error} /> : "✓"}
                </div>
            ) : null}
            <input
                {...props}
                {...field}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={styles.textInput}
            />
        </div>
    );
}
