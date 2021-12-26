import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/Nav";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserProfile";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Server from "./components/Server";

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
                <ProtectedRoute path="/users/:userId">
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path="/servers/:serverId">
                    <Server />
                </ProtectedRoute>
                <Route path="/login">
                    <SplashPage />
                </Route>
                <Route path="/sign-up">
                    <SplashPage />
                </Route>
                <ProtectedRoute path="/users">
                    <UsersList />
                </ProtectedRoute>
                {user && isOnline ? (
                    <Route path="/">
                        <Home />
                    </Route>
                ) : (
                    <Route path="/">
                        <SplashPage />
                    </Route>
                )}
            </Switch>
            <Footer />
        </div>
    );
}
