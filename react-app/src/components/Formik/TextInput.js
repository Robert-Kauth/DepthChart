import React, { useState } from "react";
import { useField } from "formik";

import StyledError from "../StyledComponents/StyledError";
import StyledIcon from "../StyledComponents/StyledIcon";
import styles from "./Formik.module.css";
import { mdiCheckBold } from "@mdi/js";

export default function TextInput({ label, helpText, ...props }) {
    const [field, meta] = useField(props);

    const [didFocus, setDidFocus] = useState(false);

    const handleFocus = () => setDidFocus(true);

    const showFeedback =
        (didFocus && field.value.trim().length > 2) || meta.touched;

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
            {showFeedback ? (
                <div aria-live="polite">
                    {meta.error ? (
                        <StyledError error={meta.error} />
                    ) : (
                        <StyledIcon icon={mdiCheckBold} />
                    )}
                </div>
            ) : null}
            <input {...field} {...props} onFocus={handleFocus} />
            <p className={styles.textXs} id={`${props.id}-help`} tabIndex="-1">
                {helpText}
            </p>
        </div>
    );
}
