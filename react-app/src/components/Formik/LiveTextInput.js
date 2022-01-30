import React, { useState } from "react";
import { useField } from "formik";

import StyledError from "../StyledComponents/StyledError";
import styles from "./Formik.module.css";

// Uses CSS to provide visual feedback to the user
export default function LiveTextInput({ label, helpText, ...props }) {
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
                        {meta.error ? <StyledError error={meta.error} /> : "✓"}
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
