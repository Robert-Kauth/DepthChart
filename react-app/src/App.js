import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/Nav";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Server from "./components/Server";
import MessageThread from "./components/MessageThread";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import Home from "./components/Home";

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
                <ProtectedRoute path="/servers/:serverId">
                    <Server />
                </ProtectedRoute>
                <ProtectedRoute path="/messages/:messageId">
                    <MessageThread />
                </ProtectedRoute>
                <Route path="/login">
                    <SplashPage />
                </Route>
                <Route path="/sign-up">
                    <SplashPage />
                </Route>
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
