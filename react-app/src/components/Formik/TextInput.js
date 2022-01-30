import React, { useState } from "react";
import { useField } from "formik";

import StyledError from "../StyledComponents/StyledError";
import styles from "./Formik.module.css";

export default function TextInput({ label, helpText, ...props }) {
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
                    {meta.error ? <StyledError>{meta.error}</StyledError> : "✓"}
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
