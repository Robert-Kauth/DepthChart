import React from "react";

import styles from "./Title.module.css";
// className={styles. }

export default function Title(props) {
    return (
        <div className={styles.titleWrapper}>
            <div className={styles.title}>{props.title}</div>
        </div>
    );
}
