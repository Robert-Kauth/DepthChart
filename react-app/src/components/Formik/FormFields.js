import React from "react";
import { useField } from "formik";
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
