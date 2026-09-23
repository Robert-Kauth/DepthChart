import { useField } from "formik";

import StyledError from "../StyledComponents/StyledError";
import type { SelectFieldProps } from "./types";

export default function MultiSelect({ label, ...props }: SelectFieldProps) {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledError error={meta.error} />
            ) : null}
        </>
    );
}
