import { useEffect, MouseEvent } from "react";
import { mdiPlusBox } from "@mdi/js";

import { loadServers, loadServer } from "../../store/servers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Server } from "../../types";

import StyledButton from "../StyledComponents/StyledButton";
import CreateServerForm from "../CreateServerForm";
import ServerTile from "../ServerTile";

import styles from "./Servers.module.css";
// className={styles. }

export default function Servers() {
    const dispatch = useAppDispatch();

    const servers = useAppSelector((state) => state.servers.all);
    const user_id = useAppSelector((state) => state.session.user!.id);

    useEffect(() => {
        dispatch(loadServers());
    }, [dispatch]);

    const selectServer = (e: MouseEvent, server: Server) => {
        e.preventDefault();

        if (server) {
            dispatch(loadServer(server.id));
        }
    };

    let user_servers: (JSX.Element | undefined)[] | undefined;
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
            return undefined;
        });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tileWrapper}>{user_servers}</div>
            <StyledButton icon={mdiPlusBox} form={CreateServerForm} />
        </div>
    );
}
