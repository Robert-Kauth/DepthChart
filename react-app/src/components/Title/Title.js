import React from "react";

import styles from "./Title.module.css";
// className={styles. }

export default function Title(props) {
    return (
        <div className={styles.titleWrapper}>
            {props.title ? (
                <div className={styles.title}>{props.title}</div>
            ) : props.name ? (
                <div className={styles.title}>{props.name}</div>
            ) : null}
        </div>
    );
}
