import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ServerTile from "./ServerTile";
import CreateServerModal from "./CreateServerModal";
import { getUserServers } from "../../store/user_servers";

import styles from "./Servers.module.css";
// className={styles. }

export default function Servers() {
    const dispatch = useDispatch();

    const servers = useSelector((state) => Object.values(state.user_servers));
    const user_id = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(getUserServers(user_id));
    }, [dispatch, user_id]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.tileWrapper}>
                {servers &&
                    servers.map((server) => (
                        <ServerTile key={server.id} server={server} />
                    ))}
            </div>
            <div className={styles.add}>
                <CreateServerModal />
            </div>
        </div>
    );
}
