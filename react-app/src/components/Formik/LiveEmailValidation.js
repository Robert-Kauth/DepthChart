import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

import StyledError from "../StyledComponents/StyledError";
import StyledIcon from "../StyledComponents/StyledIcon";
import styles from "./Formik.module.css";
import { mdiCheckBold } from "@mdi/js";

// Function to check if email is already in use
async function validateEmail(email) {
    const isValid = await fetch(`/api/auth/validate_email/${email}`);
    // console.log(isValid, typeof isValid, "<-");
    const { is_email_unique, is_user } = await isValid.json();
    // console.log(is_email_unique, "?????");
    // console.log(is_user, "@@@@@@@");
    // is_email_unique = false if already in use
    // is_email_unique = email (true) if not
    if (is_user && !is_email_unique) {
        console.log("hit user");
        return is_user;
    } else if (is_email_unique && !is_user) {
        console.log("hit email");
        return is_email_unique;
    }
    console.log("hit false");
    return false;
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

    const showFeedback = (didFocus && email.trim().length > 4) || meta.touched;
    //! Want to create a function to check if input could be a legit email before sending fetch to server
    // * want to cut done on calls to the server
    // const isEmail = () => {
    //     return;
    // };

    useEffect(() => {
        let isCurrent;

        if (email.trim() !== prev) {
            isCurrent = true;
        }

        if (email.trim() !== "" && email.includes("@")) {
            validateEmail(email).then((isValid) => {
                if (isCurrent && isValid) {
                    console.log(isValid, "@@@");
                    setFieldValue(props.name, isValid);
                    setPrev(email);
                }
                if (isCurrent && !isValid) {
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
