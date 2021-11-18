import React from "react";
import ServerTile from "./ServerTile";
import styles from "./Servers.module.css";
// className={styles. }

export default function Servers() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.tileWrapper}>
                <ServerTile />
            </div>
            <div className={styles.add}>
                <button className={styles.addButton}>
                    <img
                        className={styles.buttonImg}
                        src="https://fantasydepthchart.s3.us-west-1.amazonaws.com/plus-box.png"
                        alt="add server"
                    />
                </button>
            </div>
        </div>
    );
}
