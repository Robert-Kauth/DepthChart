import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
/*
validationSchema: Yup.object({
        email: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .max(20, 'Must be less  than 20 characters')
            .required('Email is required')
            .test('Unique Email', 'Email already in use', // <- key, message
                function (value) {
                    return new Promise((resolve, reject) => {
                        axios.get(`http://localhost:8003/api/u/user/${value}/available`)
                            .then((res) => {
                                resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.content === "The email has already been taken.") {
                                    resolve(false);
                                }
                            })
                    })
                }
            ),
    }),
*/

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
