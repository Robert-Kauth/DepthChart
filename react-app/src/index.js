import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { setModalMount } from "./store/modal";
import { ModalProvider } from "./Context";

import App from "./App";
import configureStore from "./store";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
    window.store = store;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
}

const Root = () => {
    const dispatch = useDispatch();
    const modalMooringRef = useRef(null);

    useEffect(() => {
        dispatch(setModalMount(modalMooringRef.current));
    }, [dispatch]);

    return (
        <>
            <App />
            <div ref={modalMooringRef} className="modal"></div>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ModalProvider>
                <BrowserRouter>
                    <Root />
                </BrowserRouter>
            </ModalProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
