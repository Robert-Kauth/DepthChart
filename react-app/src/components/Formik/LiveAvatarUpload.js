import React, { useState } from "react";
import { useField } from "formik";

import { useLocalStorage } from "../Hooks";
import StyledError from "../StyledComponents/StyledError";

import styles from "./Formik.module.css";

//! Need to debug and validate
export default function LiveAvatarUpload({ label, helpText, ...props }) {
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
                            <StyledError>{meta.error}</StyledError>
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
