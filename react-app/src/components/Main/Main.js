import React from "react";

import Servers from "../Servers";
import Friends from "../Friends";

import styles from "./Main.module.css";
// className={styles. }

export default function Main({ children }) {
    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.children}>{children}</div>
                <div className={styles.friends}>
                    <Friends />
                </div>
            </div>
        </div>
    );
}
