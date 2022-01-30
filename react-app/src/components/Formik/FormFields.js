import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";

import styles from "./TextInput.module.css";

const StyledErrorMessage = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: var(--red-800);
    &:before {
        content: "❌ ";
        font-size: 10px;
    }
    @media (prefers-color-scheme: dark) {
        color: var(--red-400);
    }
`;

export function TextInput({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className={styles.textInput} {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledErrorMessage>{meta.error}</StyledErrorMessage>
            ) : null}
        </>
    );
}

export function MultiSelect({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </>
    );
}

// Uses CSS to provide visual feedback to the user
export function LiveTextInput({ label, helpText, ...props }) {
    const [field, meta] = useField(props);

    const [didFocus, setDidFocus] = useState(false);

    const handleFocus = () => setDidFocus(true);

    const showFeedback =
        (didFocus && field.value.trim().length > 2) || meta.touched;
    return (
        <div
            className={`form-control ${
                showFeedback ? (meta.error ? "invalid" : "valid") : ""
            }`}>
            <div className="flex items-center space-between">
                <label htmlFor={props.id}>{label}</label>
                {showFeedback ? (
                    <div
                        id={`${props.id}-feedback`}
                        aria-live="polite"
                        className="feedback text-sm">
                        {meta.error ? meta.error : "✓"}
                    </div>
                ) : null}
            </div>
            <input
                {...props}
                {...field}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                onFocus={handleFocus}
            />
            <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
                {helpText}
            </div>
        </div>
    );
}

/*
 *Checks if email is available.
 *if true => returns email
 *if false => returns false
 */
export async function validateEmail(email) {
    const res = await fetch(`/api/auth/validate_email/${email}`);

    const { is_email_unique } = await res.json();

    return is_email_unique;
}

export function LiveEmailValidation({ label, ...props }) {
    const {
        values: { email },
        setFieldValue,setFieldError
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
                }else{
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
                    {meta.error ? meta.error : "✓"}
                </div>
            ) : null}
            <input {...props} {...field} onFocus={handleFocus} />
            {/* {meta.touched && meta.error ? <div>{meta.error}</div> : null} */}
        </div>
    );
}

/*
 *Checks if username is available.
 *if true => returns username
 *if false => returns false
 */
export async function validateUsername(username) {
    const res = await fetch(`/api/auth/validate_username/${username}`);

    const { is_username_unique } = await res.json();

    return is_username_unique;
}

export function LiveUsernameValidation({ label, ...props }) {
    const {
        values: { username },
        setFieldValue, setFieldError
    } = useFormikContext();

    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);

    const handleFocus = () => setDidFocus(true);

    const showFeedback =
      (didFocus && field.value.trim().length > 2) || meta.touched;

    useEffect(() => {
        let isCurrent = true;
        if (username.trim() !== "" && username.trim().length > 2) {
            validateUsername(username).then((validUsername) => {
                if (isCurrent && validUsername !== false) {
                    setFieldValue(props.name, validUsername);
                }else{
                    setFieldError(props.name, "Username is already in use")
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [ props.name, setFieldError, setFieldValue, username]);

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
            className="feedback text-sm"
          >
            {meta.error ? meta.error : "✓"}
          </div>
        ) : null}
        <input {...props} {...field} onFocus={handleFocus} />
      </div>
    );
}
