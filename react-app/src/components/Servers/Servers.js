import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiPlusBox } from "@mdi/js";

import { showModal, setCurrentModal } from "../../store/modal";
import { loadServers, loadServer } from "../../store/servers";

import CreateServerForm from "./CreateServerForm";
import ServerTile from "./ServerTile";

import styles from "./Servers.module.css";
// className={styles. }

const Button = styled.button`
    background-color: #014421;
    color: #029e7e;
    margin: 0;
    padding-top: 5px;
    border: 2px solid darkgreen;
    border-radius: 2px;
    box-shadow: 0 0 5px lightgreen;
    &:hover {
        background-color: #0bda51;
        color: #014421;
    }
`;

const StyledIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
`;

export default function Servers() {
    const dispatch = useDispatch();

    const servers = useSelector((state) => state.servers.all);
    const user_id = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(loadServers());
    }, [dispatch]);

    const showCreateServer = () => {
        dispatch(setCurrentModal(CreateServerForm));
        dispatch(showModal());
    };

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
            <Button className={styles.button} onClick={showCreateServer}>
                <StyledIcon path={mdiPlusBox} size={1} />
            </Button>
        </div>
    );
}
