import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

import StyledError from "../StyledComponents/StyledError";
import StyledIcon from "../StyledComponents/StyledIcon";
import styles from "./Formik.module.css";
import { mdiCheckBold } from "@mdi/js";
import { validateSignupEmail, validateLoginEmail } from "../utils";

export default function LiveEmailValidation({ label, ...props }) {
    const {
        values: { email },
        setFieldValue,
        setFieldError,
        errors,
    } = useFormikContext();

    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const [prev, setPrev] = useState("");
    const [emailErrors, setEmailErrors] = useState("");

    const handleFocus = () => {
        setDidFocus(true);
        if (field.value !== prev) {
            setEmailErrors("");
        }
    };
    const handleBlur = () => {
        setEmailErrors(errors.email);
    };

    const showFeedback =
        (didFocus && email.toString().trim().length > 4) || meta.touched;

    useEffect(() => {
        let isCurrent = false;

        if (email.toString().trim() !== prev) {
            isCurrent = true;
        }

        if (
            email.toString().trim() !== "" &&
            email.toString().trim().length > 2 &&
            props.signup &&
            isCurrent
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
        let isCurrent = false;

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
                    ? meta.error || emailErrors
                        ? `${styles.invalid}`
                        : `${styles.valid}`
                    : null
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
                    meta.error || emailErrors ? (
                        <StyledError error={meta.error || emailErrors} />
                    ) : (
                        <StyledIcon icon={mdiCheckBold} color="green" />
                    )
                ) : null}
            </div>
        </div>
    );
}
