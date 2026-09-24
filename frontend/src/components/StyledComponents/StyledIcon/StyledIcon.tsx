import { Icon } from "@mdi/react";

import styles from "./StyledIcon.module.css";

export default function StyledIcon(props: { icon: string; color?: string }) {
    return <Icon className={styles.icon} path={props.icon} color={props.color} />;
}
