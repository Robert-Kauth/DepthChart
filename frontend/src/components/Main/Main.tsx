import type { ReactNode } from "react";

import styles from "./Main.module.css";
// className={styles. }

interface MainProps {
    card?: ReactNode;
    feed?: ReactNode;
}

export default function Main(props: MainProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>{props.card}</div>
            <div className={styles.feed}>{props.feed}</div>
        </div>
    );
}
