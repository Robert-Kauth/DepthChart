import React from "react";
import { useFormik } from "formik";

const FormikContext = React.createContext({});

export default function Formik({ children, ...props }) {
    const formikStateAndHelpers = useFormik(props);

    return (
        <FormikContext.Provider value={formikStateAndHelpers}>
            {typeof children === "function"
                ? children(formikStateAndHelpers)
                : children}
        </FormikContext.Provider>
    );
}
