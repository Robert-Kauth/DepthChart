import React from "react";

import styles from "./Main.module.css";
// className={styles. }

export default function Main(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>{props.card}</div>
            <div className={styles.feed}>{props.feed}</div>
        </div>
    );
}
