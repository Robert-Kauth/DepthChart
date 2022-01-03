import React from "react";
import { useSelector } from "react-redux";

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

    console.log(mutualServers);

    return (
        <div>
            {mutualServers &&
                mutualServers.map((server) => (
                    <div key={server.id}>
                        <img src={server.icon} alt="server icon" />
                    </div>
                ))}
        </div>
    );
}
