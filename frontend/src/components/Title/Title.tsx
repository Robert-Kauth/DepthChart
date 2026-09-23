import type { ReactNode } from "react";

import styles from "./Title.module.css";
// className={styles. }

interface TitleProps {
    title?: string;
    name?: string;
    button?: ReactNode;
    className?: string;
}

export default function Title(props: TitleProps) {
    return (
        <div className={styles.titleWrapper}>
            {props.title ? (
                <div className={styles.title}>{props.title}</div>
            ) : props.name ? (
                <div className={styles.title}>{props.name}</div>
            ) : null}
            {props.button ? (
                <div className={styles.button}>{props.button}</div>
            ) : null}
        </div>
    );
}
