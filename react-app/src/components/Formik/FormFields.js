import React from "react";
import { useField } from "formik";

import styles from "./TextInput.module.css";

export function TextInput({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className={styles.textInput} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </>
    );
}
