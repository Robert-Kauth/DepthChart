import React from "react";

import { useParams } from "react-router-dom";

import styles from "./Server.module.css";
// className={styles. }

export default function Server() {
    const { serverId } = useParams();

    return (
        <div className={styles.wrapper}>
            <h1>Hello from server</h1>
        </div>
    );
}
