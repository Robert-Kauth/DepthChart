import React from "react";
import ServerTile from "./ServerTile";
import styles from "./Servers.module.css";
// className={styles. }

export default function Servers() {
    return (
        <div className={styles.wrapper}>
            <ServerTile />
        </div>
    );
}
