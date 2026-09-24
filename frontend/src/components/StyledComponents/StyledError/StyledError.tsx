import { Icon } from "@mdi/react";
import { mdiExclamation } from "@mdi/js";

import styles from "./StyledError.module.css";

export default function StyledError({ error }: { error?: string }) {
    return (
        <>
            <Icon className={styles.icon} path={mdiExclamation} />
            <span className={styles.message}>{error}</span>
        </>
    );
}
