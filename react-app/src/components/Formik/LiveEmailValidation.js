import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

import StyledError from "../StyledComponents/StyledError";
import styles from "./Formik.module.css";

/*
 *Checks if email is available.
 *if true => returns email
 *if false => returns false
 */
async function validateEmail(email) {
    const res = await fetch(`/api/auth/validate_email/${email}`);

    const { is_email_unique } = await res.json();

    return is_email_unique;
}

export default function LiveEmailValidation({ label, ...props }) {
    const {
        values: { email },
        setFieldValue,
        setFieldError,
    } = useFormikContext();

    const [field, meta] = useField(props);

    const [didFocus, setDidFocus] = useState(false);

    const handleFocus = () => setDidFocus(true);

    const showFeedback =
        (didFocus && field.value.trim().length > 2) || meta.touched;

    useEffect(() => {
        let isCurrent = true;
        if (email.trim() !== "" && email.includes("@")) {
            validateEmail(email).then((validEmail) => {
                if (isCurrent && validEmail !== false) {
                    setFieldValue(props.name, validEmail);
                } else {
                    setFieldError(props.name, "Email is already in use");
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [email, props.name, setFieldError, setFieldValue]);

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
                className={styles.textInput}
            />
        </div>
    );
}
