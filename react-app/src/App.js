import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/Nav";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserProfile";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";

import { authenticate } from "./store/session";

import styles from "./App.module.css";
// className={styles. }

export default function App() {
    const dispatch = useDispatch();

    const isOnline = useSelector((state) => state.session.online);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch]);

    return (
        <div className={styles.appContainer}>
            <NavBar />
            <Switch>
                <Route path="/login" exact={true}>
                    <SplashPage />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SplashPage />
                </Route>
                <ProtectedRoute path="/users" exact={true}>
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute>
                {user && isOnline ? (
                    <ProtectedRoute path="/" exact={true}>
                        <h1>My Home Page</h1>
                    </ProtectedRoute>
                ) : (
                    <SplashPage />
                )}
            </Switch>
            <Footer />
        </div>
    );
}
