import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mdiPlusBox } from "@mdi/js";

import { loadServers, loadServer } from "../../store/servers";

import StyledButton from "../StyledButton";
import CreateServerForm from "../CreateServerForm";
import ServerTile from "../ServerTile";

import styles from "./Servers.module.css";
// className={styles. }

export default function Servers() {
    const dispatch = useDispatch();

    const servers = useSelector((state) => state.servers.all);
    const user_id = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(loadServers());
    }, [dispatch]);

    const selectServer = (e, server) => {
        e.preventDefault();

        if (server) {
            dispatch(loadServer(server.id));
        }
    };

    let user_servers;
    if (servers) {
        user_servers = Object.values(servers).map((server) => {
            if (server.owner_id === user_id) {
                return (
                    <button
                        className={styles.tileButton}
                        key={server.id}
                        onClick={(e) => selectServer(e, server)}>
                        <ServerTile server={server} />
                    </button>
                );
            }
            return user_servers;
        });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tileWrapper}>{user_servers}</div>
            <StyledButton icon={mdiPlusBox} form={CreateServerForm} />
        </div>
    );
}
