import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadAllUserMessages } from "../../store/messages";

import styles from "./Messages.module.css";
// className={styles. }

export default function Messages() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(loadAllUserMessages(user.id));
    }, [dispatch, user.id]);
    return (
        <div className={styles.wrapper}>
            <h1>Hello from messages</h1>
        </div>
    );
}
