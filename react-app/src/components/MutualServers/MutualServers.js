import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./MutualServers.module.css";
// className={styles. }

export default function MutualServers({ user }) {
    const sessionUser = useSelector((state) => state.session.user);
    const servers = useSelector((state) => state.servers);

    const mutualServersIds = user.servers.reduce((acc, serverId) => {
        if (sessionUser.servers.includes(serverId)) {
            acc.push(serverId);
        }
        return acc;
    }, []);

    const mutualServers = mutualServersIds.reduce((acc, id) => {
        if (servers[id]) {
            acc.push(servers[id]);
        }
        return acc;
    }, []);

    return (
        <div className={styles.servers}>
            {mutualServers &&
                mutualServers.map((server) => (
                    <Link key={server.id} to={`/servers/${server.id}`}>
                        <img src={server.icon} alt="server icon" />
                    </Link>
                ))}
        </div>
    );
}
