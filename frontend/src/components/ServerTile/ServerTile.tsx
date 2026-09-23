import { Link } from "react-router-dom";

import type { Server } from "../../types";

import styles from "./ServerTile.module.css";
// className={styles. }

export default function ServerTile({ server }: { server?: Server }) {
    if (!server) {
        return null;
    }
    return (
        <div className={styles.iconWrapper}>
            <Link to={`/servers/${server.id}`}>
                <img
                    className={styles.icon}
                    src={server.icon}
                    alt="Server-Icon"
                />
            </Link>
        </div>
    );
}
