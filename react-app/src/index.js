import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider } from "./Modal";

import App from "./App";
import configureStore from "./store";

import * as usersActions from "./store/users";
import * as userActions from "./store/user";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
    window.store = store;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.usersActions = usersActions;
    window.userActions = userActions;
}

const Root = () => {
    return (
        <Provider store={store}>
            <ModalProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ModalProvider>
        </Provider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById("root")
);
