import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./components/Modal";
import NavBar from "./components/Nav";
import ProtectedRoute from "./components/auth";
import Server from "./components/Server";
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
        <div className={styles.app}>
            <Modal />
            <div className={styles.navBar}>
                <NavBar />
            </div>
            <div className={styles.main}>
                <Switch>
                    <ProtectedRoute path="/servers/:serverId">
                        <Server />
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
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
