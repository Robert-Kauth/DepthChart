import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { signUp } from "../../store/session";
import { hideModal } from "../../store/modal";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import {
    TextInput,
    LiveUsernameValidation,
    LiveEmailValidation,
} from "../Formik";

import "./optional";
import styles from "./SignupForm.module.css";

export default function SignupForm() {
    const dispatch = useDispatch();

    // Validation schema- Provides livefeed back to user. Generates error message (strings)
    const SignupFormSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, "Must be at least 4 characters")
            .max(20, "Must be at least 20 characters")
            .required("Username is Required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email Required")
            .min(6, "Must be at least 6 characters")
            .max(20, "Must be at least 20 characters"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirm_password: Yup.string()
            .required("Must provide password confirmation")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const handleSubmit = async (values) => {
        const validValues = await SignupFormSchema.validate(values);

        dispatch(signUp(validValues)).then(() => {
            dispatch(hideModal());
            return <Redirect to="/" />;
        })
    };

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                confirm_password: "",
            }}
            validationSchema={SignupFormSchema}
            onSubmit={(values) => handleSubmit(values)}>
            <Form className={styles.form}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Sign Up</legend>
                    <div className={styles.usernameWrapper}>
                        <LiveUsernameValidation
                            label="User Name:"
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                        />
                    </div>
                    <div className={styles.emailWrapper}>
                        <LiveEmailValidation
                            label="Email:"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                        />
                    </div>
                    <div className={styles.passwordWrapper}>
                        <TextInput
                            label="Password:"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className={styles.confirm_passwordWrapper}>
                        <TextInput
                            label="Confirm Password:"
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type="submit">
                            Sign Up
                        </button>
                    </div>
                </fieldset>
            </Form>
        </Formik>
    );
}
