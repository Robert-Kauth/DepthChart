import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

import StyledError from "../StyledComponents/StyledError";
import StyledIcon from "../StyledComponents/StyledIcon";
import styles from "./Formik.module.css";
import { mdiCheckBold } from "@mdi/js";

// Function to check if singup email is already in use
async function validateSignupEmail(email) {
    const res = await fetch(`/api/auth/validate_signup_email/${email}`);
    const isValid = await res.json();
    return isValid;
}

async function validateLoginEmail(email) {
    const res = await fetch(`/api/auth/validate_login_email/${email}`);
    const isValid = await res.json();
    return isValid;
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
        (didFocus && email.toString().trim().length > 4) || meta.touched;

    useEffect(() => {
        let isCurrent;

        if (email.toString().trim() !== prev) {
            isCurrent = true;
        }

        if (
            email.toString().trim() !== "" &&
            email.toString().trim().length > 2 &&
            props.signup
        ) {
            validateSignupEmail(email).then((isValid) => {
                const { is_email_unique } = isValid;
                if (isCurrent && is_email_unique) {
                    setFieldValue(props.name, email);
                    setPrev(email);
                }
                if (isCurrent && !is_email_unique) {
                    setFieldError(props.name, "Email is already in use");
                    setPrev(field.value.toString().trim());
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [
        email,
        field.value,
        prev,
        props.name,
        props.signup,
        setFieldError,
        setFieldValue,
    ]);

    useEffect(() => {
        let isCurrent;

        if (email.toString().trim() !== prev) {
            isCurrent = true;
        }
        if (
            email.toString().trim() !== "" &&
            email.toString().trim().length > 2 &&
            props.login
        ) {
            validateLoginEmail(email).then((isValid) => {
                const { is_user } = isValid;
                if (isCurrent && is_user) {
                    setFieldValue(props.name, email);
                    setPrev(email);
                }
                if (isCurrent && !is_user) {
                    setFieldError(props.name, "Email not found");
                    setPrev(field.value.toString().trim());
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [
        email,
        field.value,
        prev,
        props.login,
        props.name,
        setFieldError,
        setFieldValue,
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
            <label htmlFor={props.id || props.name}>{label}</label>
            <input
                {...props}
                {...field}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
