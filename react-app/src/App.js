import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "./Modal";
import LoginForm from "./components/Login";
import SignUpForm from "./components/Signup";
import NavBar from "./components/Nav";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";

import { authenticate } from "./store/session";

import "./index.css";

export default function App() {
    const dispatch = useDispatch();

    const isOnline = useSelector((state) => state.session.online);

    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch]);

    if (!isOnline) {
        return null;
    }

    return (
        <div className="appContainer">
            <NavBar />
            <Modal />
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path="/users" exact={true}>
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path="/" exact={true}>
                    <h1>My Home Page</h1>
                </ProtectedRoute>
            </Switch>
        </div>
    );
}
