import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextInput,
  LiveUsernameValidation,
  LiveEmailValidation,
} from "../Formik";

import styles from "./SignupForm.module.css";

export default function SignupForm() {
    const validationSchema = Yup.object().shape({
      username: Yup.string()
        .min(4, "Must be at least 4 characters")
        .max(20, "Must be at least 20 characters").required("Username is Required"),
      avatar: Yup.string().url(),
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
        await new Promise((r) => setTimeout(r, 500));
        setSubmitting(false);
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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                  autocomplete="username"
                />
              </div>
              <div className={styles.avatarWrapper}>
                <TextInput
                  label="Avatar:"
                  id="avatar"
                  name="avatar"
                  type="url"
                  helpText="Upload a optional custom avatar to avoid getting default"
                />
              </div>
              <div className={styles.emailWrapper}>
                <LiveEmailValidation
                  label="Email:"
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                />
              </div>
              <div className={styles.passwordWrapper}>
                <TextInput
                  label="Password:"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                />
              </div>
              <div className={styles.passwordWrapper}>
                <TextInput
                  label="Confirm Password:"
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autocomplete="new-password"
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
