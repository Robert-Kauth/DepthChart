import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { setModalMount } from "./store/modal";
import { useAppDispatch } from "./store/hooks";

import App from "./App";
import configureStore, { AppDispatch, AppStore, RootState } from "./store";

import "./index.css";

const store = configureStore();

declare global {
    interface Window {
        store: AppStore;
        getState: () => RootState;
        dispatch: AppDispatch;
    }
}

if (import.meta.env.DEV) {
    window.store = store;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
}

const Root = () => {
    const dispatch = useAppDispatch();
    const modalMooringRef = useRef<HTMLDivElement>(null);

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
