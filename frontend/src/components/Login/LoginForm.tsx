import { MouseEvent } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { TextInput, LiveEmailValidation } from "../Formik";
import { login, demoLogin } from "../../store/session";
import { hideModal } from "../../store/modal";
import { useAppDispatch } from "../../store/hooks";

import styles from "./LoginForm.module.css";
// className={styles. }

export default function LoginForm() {
    const dispatch = useAppDispatch();

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

    const handleSubmit = async (values: { email: string; password: string }) => {
        const validUser = await LoginFormSchema.validate(values);
        dispatch(login(validUser));
        dispatch(hideModal());
        return <Navigate to="/" />;
    };

    const handleDemoLogin = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(demoLogin()).then(() => {
            dispatch(hideModal());
            return <Navigate to="/" />;
        });
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginFormSchema}
            onSubmit={(values) => handleSubmit(values)}>
            <Form className={styles.form}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Login</legend>
                    <div className={styles.emailWrapper}>
                        <LiveEmailValidation
                            label="Email:"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            login="true"
                        />
                    </div>
                    <div className={styles.passwordWrapper}>
                        <TextInput
                            label="Password:"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.loginButton}>
                            Login
                        </button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={(e) => handleDemoLogin(e)}
                            className={styles.demoButton}>
                            Demo Login
                        </button>
                    </div>
                </fieldset>
            </Form>
        </Formik>
    );
}
