import { Link } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";
import type { Server, User } from "../../types";

import styles from "./MutualServers.module.css";
// className={styles. }

export default function MutualServers({ user }: { user: User }) {
    const sessionUser = useAppSelector((state) => state.session.user)!;
    const servers = useAppSelector((state) => state.servers.all)!;

    const mutualServersIds = user.servers.reduce<number[]>((acc, serverId) => {
        if (sessionUser.servers.includes(serverId)) {
            acc.push(serverId);
        }
        return acc;
    }, []);

    const mutualServers = mutualServersIds.reduce<Server[]>((acc, id) => {
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
                        <img
                            className={styles.img}
                            src={server.icon}
                            alt="server icon"
                        />
                    </Link>
                ))}
        </div>
    );
}
