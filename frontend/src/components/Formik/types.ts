import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

// Props shared by the Formik field wrappers. `login`/`signup` are passed as
// the string "true" by the forms, matching the original JSX.
export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    helpText?: string;
    login?: string;
    signup?: string;
};

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    label: string;
};
