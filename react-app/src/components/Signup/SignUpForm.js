import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SignupForm() {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required"),
        avatar: Yup.string().required("Required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Required")
            .test("Unique Email", "Email is already in use", async () => {
                await fetch("/api/auth/signup");
            }),
        password: Yup.string()
            .min(8, "Password needs to be at least 8 characters")
            .required("Password is required"),
    });

    return (
        <Formik
            initialValues={{
                username: "",
                avatar: "",
                email: "",
                password: "",
                repeat_password: "",
            }}
            validationSchema={validationSchema}></Formik>
    );
}
