import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

import StyledError from "../StyledComponents/StyledError";
import styles from "./Formik.module.css";

// Function to check if email is already in use
async function validateEmail(email) {
    const res = await fetch(`/api/auth/validate_email/${email}`);

    const { is_email_unique } = await res.json();
    // is_email_unique = false if already in use
    // is_email_unique = email (true) if not

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
    const [prev, setPrev] = useState("");

    const handleFocus = () => setDidFocus(true);
    const handleBlur = () => setDidFocus(true);

    const showFeedback =
        (didFocus && field.value.trim().length > 2) || meta.touched;

    useEffect(() => {
        let isCurrent;

        if (email.trim() !== prev) {
            isCurrent = true;
        }

        if (email.trim() !== "" && email.includes("@")) {
            validateEmail(email).then((validEmail) => {
                if (isCurrent && validEmail) {
                    setFieldValue(props.name, validEmail);
                    setPrev(email);
                }
                if (isCurrent && !validEmail) {
                    setFieldError(props.name, "Email is already in use");
                    setPrev(field.value.trim());
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [email, field.value, prev, props.name, setFieldError, setFieldValue]);

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
