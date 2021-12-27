import React from "react";

import Servers from "../Servers";
import Friends from "../Friends";

import styles from "./Main.module.css";
// className={styles. }

export default function Main(props) {
    console.log(props.children);
    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <div className={styles.servers}>
                    <Servers />
                </div>
                <div className={styles.children}>
                    <div>{props.card}</div>
                    <div>{props.feed}</div>
                </div>
                <div className={styles.friends}>
                    <Friends />
                </div>
            </div>
        </div>
    );
}
