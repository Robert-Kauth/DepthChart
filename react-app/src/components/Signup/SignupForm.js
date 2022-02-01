import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { signUp } from "../../store/session";
import * as Yup from "yup";
import {
    TextInput,
    LiveUsernameValidation,
    LiveEmailValidation,
} from "../Formik";

import "./optional";
import styles from "./SignupForm.module.css";

export default function SignupForm({ setShowModal }) {
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState({ avatar: false, count: null });
    const [errors, setErrors] = useState([]);

    // Gets avatar value from browser local storage
    useEffect(() => {
        setAvatar(JSON.parse(window.localStorage.getItem("avatar")));
    }, []);

    //Updates browsers stored value of avatar upon changes
    useEffect(() => {
        window.localStorage.setItem("avatar", JSON.stringify(avatar));
    }, [avatar]);

    // Validation schema- Provides livefeed back to user. Generates error message (strings)
    const SignupFormSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, "Must be at least 4 characters")
            .max(20, "Must be at least 20 characters")
            .required("Username is Required"),
        avatar: Yup.string().url().optional(),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email Required")
            .min(6, "Must be at least 6 characters")
            .max(20, "Must be at least 20 characters"),
        password: Yup.string()
            .min(8, "Password needs to be at least 8 characters")
            .required("Password is required"),
        confirm_password: Yup.string()
            .required("Must provide password confirmation")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        //?Promise triggers setSubmitting(false) when it resolves
        await new Promise((res) => setTimeout(res, 500));

        await SignupFormSchema.validate(values)
            .then((formValues) => {
                console.log(
                    formValues,
                    "RESSS!!!!!!!!!!!!!",
                    typeof formValues
                );
                const data = dispatch(signUp(formValues));
                if (data.errors) {
                    setErrors(data.errors);
                }
                return;
            })
            .catch((e) => console.log(e.name, e.errors));

        // setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                username: "",
                avatar: "",
                email: "",
                password: "",
                confirm_password: "",
            }}
            validationSchema={SignupFormSchema}
            onSubmit={(values) => handleSubmit(values)}
            // initialStatus={{success:false}}
        >
            <Form className={styles.form}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Sign Up</legend>
                    <div className={styles.inputs}>
                        <div className={styles.usernameWrapper}>
                            <LiveUsernameValidation
                                label="User Name:"
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                            />
                        </div>
                        <div className={styles.avatarWrapper}>
                            <TextInput
                                label="Avatar:"
                                id="avatar"
                                name="avatar"
                                type="url"
                                helpText="Upload custom avatar -optional"
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
                        <div className={styles.passwordWrapper}>
                            <TextInput
                                label="Confirm Password:"
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                autoComplete="new-password"
                            />
                        </div>
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
