import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Modal from "./components/Modal";
import NavBar from "./components/Nav";
import ProtectedRoute from "./components/auth";
import Server from "./components/Server";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import Home from "./components/Home";

import { authenticate } from "./store/session";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import styles from "./App.module.css";
// className={styles. }

export default function App() {
    const dispatch = useAppDispatch();

    const isOnline = useAppSelector((state) => state.session.online);
    const user = useAppSelector((state) => state.session.user);

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
                <Routes>
                    <Route
                        path="/servers/:serverId"
                        element={
                            <ProtectedRoute>
                                <Server />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="*"
                        element={user && isOnline ? <Home /> : <SplashPage />}
                    />
                </Routes>
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
