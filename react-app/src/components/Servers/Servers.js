import React from "react";

import ServerTile from "./ServerTile";
import CreateServerModal from "./CreateServerModal";

import styles from "./Servers.module.css";
// className={styles. }

export default function Servers() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.tileWrapper}>
                <ServerTile />
            </div>
            <div className={styles.add}>
                <CreateServerModal />
            </div>
        </div>
    );
}
