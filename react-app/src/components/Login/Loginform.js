import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { TextInput, LiveEmailValidation } from "../Formik";
import { login } from "../../store/session";
import { hideModal } from "../../store/modal";

export default function LoginForm() {
    const dispatch = useDispatch();

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email Required")
            .min(6, "Must be at least 6 characters")
            .max(20, "Must be at least 20 characters"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const handleSubmit = async (values) => {
        const validUser = await LoginFormSchema.validate(values);
        dispatch(login(validUser)).then(() => {
            dispatch(hideModal());
            return <Redirect to="/" />;
        });
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginFormSchema}
            onSubmit={(values) => handleSubmit(values)}>
            <Form>
                <fieldset>
                    <legend>Login</legend>
                    <div>
                        <LiveEmailValidation
                            label="Email:"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <TextInput
                            label="Password:"
                            id="password"
                            name="password"
                            type="text"
                            autoComplete="password"
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </fieldset>
            </Form>
        </Formik>
    );
}
