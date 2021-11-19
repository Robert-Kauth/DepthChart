import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getUserServers } from "../../store/user_servers";

import styles from "./ServerTile.module.css";
// className={styles. }

export default function ServerTile() {
    const dispatch = useDispatch();

    const servers = useSelector((state) => Object.values(state.user_servers));
    const user_id = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(getUserServers(user_id));
    }, [dispatch, user_id]);

    return (
        <div>
            {servers &&
                servers.map((server) => (
                    <div key={server.id} className={styles.iconWrapper}>
                        <Link to={`/servers/${server.id}`}>
                            <img
                                className={styles.icon}
                                src={server.icon}
                                alt="Server-Icon"
                            />
                        </Link>
                    </div>
                ))}
        </div>
    );
}
