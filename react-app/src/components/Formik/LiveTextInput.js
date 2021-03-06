import React, { useState } from "react";
import { useField } from "formik";

import StyledError from "../StyledComponents/StyledError";
import StyledIcon from "../StyledComponents/StyledIcon";
import { mdiCheckBold } from "@mdi/js";
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
            className={`${styles.formControl} ${
                showFeedback
                    ? meta.error
                        ? `${styles.invalid}`
                        : `${styles.valid}`
                    : ""
            }`}>
            <label htmlFor={props.id || props.name}>{label}</label>
            {showFeedback ? (
                meta.error ? (
                    <StyledError error={meta.error} />
                ) : (
                    <StyledIcon icon={mdiCheckBold} color="green" />
                )
            ) : null}
            <input {...props} {...field} onFocus={handleFocus} />
            <p className={styles.textXs} id={`${props.id}-help`} tabIndex="-1">
                {helpText}
            </p>
        </div>
    );
}
