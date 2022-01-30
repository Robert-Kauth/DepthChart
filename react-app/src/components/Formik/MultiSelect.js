import React from "react";
import { useField } from "formik";

import StyledError from "../StyledComponents/StyledError";
import styles from "./Formik.module.css";

export default function MultiSelect({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledError className={styles.error}>{meta.error}</StyledError>
            ) : null}
        </>
    );
}
