import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";

import styles from "./TextInput.module.css";
import { useLocalStorage } from "../Hooks";

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

export function TextInput({ label, helpText, ...props }) {
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
            <label htmlFor={props.id || props.name}>{label}</label>
            {showFeedback ? (
                <div
                    id={`${props.id}-feedback`}
                    aria-live="polite"
                    className="feedback text-sm">
                    {meta.error ? (
                        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
                    ) : (
                        "✓"
                    )}
                </div>
            ) : null}
            <input
                className={styles.textInput}
                {...field}
                {...props}
                onFocus={handleFocus}
            />
            <p className={styles.textXs} id={`${props.id}-help`} tabIndex="-1">
                {helpText}
            </p>
        </div>
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

export function LiveAvatarUpload({ label, helpText, ...props }) {
    const [field, meta] = useField(props);

    const [didFocus, setDidFocus] = useState(false);
    const [avatarSelection, setAvatarSelection] = useState(false);
    const [ls_Avatar, setls_Avatar] = useLocalStorage("avatar", {
        avatar: false,
    });
    console.log(ls_Avatar, setls_Avatar, "uselocal storage state and fx");

    const handleFocus = () => setDidFocus(true);
    const showAvatar = didFocus && avatarSelection;

    const showFeedback =
        (didFocus && field.value.trim().length > 2) || meta.touched;

    return (
        <div
            className={`form-control ${
                showFeedback ? (meta.error ? "invalid" : "valid") : ""
            }`}>
            <div>
                <label htmlFor={props.id}>{label}</label>
                <input
                    type="checkbox"
                    id={props.id}
                    name={props.id}
                    value={avatarSelection}
                    onChange={() => setAvatarSelection(!avatarSelection)}
                />
            </div>
            <div className="flex items-center space-between">
                <label htmlFor={props.id}>{label}</label>
                {showFeedback && showAvatar ? (
                    <div
                        id={`${props.id}-feedback`}
                        aria-live="polite"
                        className="feedback text-sm">
                        {meta.error ? (
                            <StyledErrorMessage>
                                {meta.error}
                            </StyledErrorMessage>
                        ) : (
                            "✓"
                        )}
                    </div>
                ) : null}
            </div>
            {showAvatar ? (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.textInput}
                        {...props}
                        {...field}
                        aria-describedby={`${props.id}-feedback ${props.id}-help`}
                        onFocus={handleFocus}
                    />
                    <div
                        className="text-xs"
                        id={`${props.id}-help`}
                        tabIndex="-1">
                        {helpText}
                    </div>
                </>
            ) : null}
        </div>
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
                        {meta.error ? (
                            <StyledErrorMessage>
                                {meta.error}
                            </StyledErrorMessage>
                        ) : (
                            "✓"
                        )}
                    </div>
                ) : null}
            </div>
            <input
                className={styles.textInput}
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
                    {meta.error ? (
                        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
                    ) : (
                        "✓"
                    )}
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
        if (username.trim() !== "" && username.trim().length > 2) {
            validateUsername(username).then((validUsername) => {
                if (isCurrent && validUsername !== false) {
                    setFieldValue(props.name, validUsername);
                } else {
                    setFieldError(props.name, "Username is already in use");
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [props.name, setFieldError, setFieldValue, username]);

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
                    {meta.error ? (
                        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
                    ) : (
                        "✓"
                    )}
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
