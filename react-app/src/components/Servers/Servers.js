import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ServerTile from "./ServerTile";
import CreateServerModal from "./CreateServerModal";
import { getUserServers } from "../../store/user_servers";
import { loadServers } from "../../store/servers";

import styles from "./Servers.module.css";
// className={styles. }

export default function Servers() {
    const dispatch = useDispatch();

    const servers = useSelector((state) => state.servers);
    // const servers = useSelector((state) => Object.values(state.user_servers));
    const user_id = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(getUserServers(user_id));
        dispatch(loadServers());
    }, [dispatch, user_id]);

    let user_servers;
    if (servers) {
        user_servers = Object.values(servers).map((server) => {
            if (server.owner_id === user_id) {
                return <ServerTile key={server.id} server={server} />;
            }
            return user_servers;
        });
    }

    return (
        <div className={styles.wrapper}>
            gs
            <div className={styles.tileWrapper}>{user_servers}</div>
            <div className={styles.add}>
                <CreateServerModal />
            </div>
        </div>
    );
}
