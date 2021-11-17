import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

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

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
