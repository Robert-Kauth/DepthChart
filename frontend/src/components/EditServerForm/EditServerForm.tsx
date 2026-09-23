import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { mdiArrowLeftCircle } from "@mdi/js";
import styled from "styled-components";
import { Icon } from "@mdi/react";

import { editServer } from "../../store/servers";
import { hideModal } from "../../store/modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Server } from "../../types";
import ServerDeleteButton from "../ServerDeleteButton";
import Errors from "../Errors";

import styles from "./EditServerForm.module.css";

const Button = styled.button`
    background-color: #014421;
    color: #029e7e;
    margin: 0 5px;
    height: 74px;
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

export default function EditServerForm() {
    const dispatch = useAppDispatch();

    const servers = useAppSelector((state) => state.servers.all);
    const user_id = useAppSelector((state) => state.session.user!.id);

    const [errors, setErrors] = useState<string[]>([]);
    const [name, setName] = useState("");
    const [serverId, setServerId] = useState<string | null>(null);
    const [topic, setTopic] = useState("");
    const [icon, setIcon] = useState("");
    const [newIcon, setNewIcon] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    let user_servers: Server[] | undefined;
    if (servers) {
        user_servers = Object.values(servers).reduce<Server[]>((a, server) => {
            if (server.owner_id === user_id) {
                a.push(server);
            }
            return a;
        }, []);
    }

    let selectedServer!: Server;
    if (serverId) {
        selectedServer = servers![+serverId];
    }

    const setShowField = (e: MouseEvent) => {
        e.preventDefault();
        setNewIcon(!newIcon);
    };

    const renderDelete = (e: MouseEvent) => {
        e.preventDefault();
        setShowDelete(!showDelete);
    };

    const validateEdit = () => {
        const err: string[] = [];
        if (name.length < 2) {
            err.push("Name must be at least 2 characters long");
        }
        if (topic.length < 5) {
            err.push("Topic must be at least 5 characters long");
        }
        setErrors(err);
        return err;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errs = validateEdit();

        if (!errs.length) {
            setErrors([]);
            let edit;
            if (!icon) {
                edit = {
                    id: serverId,
                    name,
                    topic,
                    icon: selectedServer.icon,
                };
            } else {
                edit = {
                    id: serverId,
                    name,
                    topic,
                    icon,
                };
            }
            dispatch(editServer(edit));
            dispatch(hideModal());
        }
    };

    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors([]);
        setName(e.target.value);
    };

    const updateTopic = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors([]);
        setTopic(e.target.value);
    };

    const updateIcon = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors([]);
        setIcon(e.target.value);
    };

    const goBack = (e: MouseEvent) => {
        e.preventDefault();
        setServerId(null);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset className={styles.field}>
                <legend className={styles.legend}>Edit Server</legend>
                <Errors errors={errors} />
                {!serverId && (
                    <div className={styles.selectWrapper}>
                        <label className={styles.serverNameLabelWrapper}>
                            Name of server
                        </label>
                        <select
                            className={styles.serverSelect}
                            onChange={(e) => setServerId(e.target.value)}>
                            <option>--Please choose a server to edit--</option>
                            {user_servers &&
                                Object.values(user_servers).map((server) => (
                                    <option key={server.id} value={server?.id}>
                                        {server.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                {serverId && (
                    <div className={styles.inputWrapper}>
                        <div className={styles.nameWrapper}>
                            <label className={styles.nameLabel}>Name:</label>
                            <input
                                type="text"
                                placeholder={selectedServer.name}
                                value={name}
                                onChange={updateName}
                            />
                        </div>
                        <div className={styles.topicWrapper}>
                            <label className={styles.topicLabel}>Topic:</label>
                            <input
                                type="text"
                                value={topic}
                                placeholder={selectedServer.topic}
                                onChange={updateTopic}
                            />
                        </div>
                        <div className={styles.iconInput}>
                            <div className={styles.iconWrapper}>
                                <label className={styles.iconLabel}>
                                    Current Icon
                                </label>
                                <img
                                    className={styles.iconImg}
                                    src={selectedServer.icon}
                                    alt="Server Icon"
                                />
                            </div>
                            <div className={styles.iconButtonWrapper}>
                                {!newIcon ? (
                                    <button
                                        className={styles.button}
                                        type="button"
                                        value={String(newIcon)}
                                        onClick={setShowField}>
                                        Update Icon?
                                    </button>
                                ) : (
                                    <button
                                        className={styles.button}
                                        type="button"
                                        value={String(newIcon)}
                                        onClick={setShowField}>
                                        Don't update Icon
                                    </button>
                                )}
                                <div className={styles.newIconWrapper}>
                                    {newIcon && (
                                        <>
                                            <label
                                                className={styles.newIconLabel}>
                                                Icon URL:
                                            </label>
                                            <input
                                                type="url"
                                                value={icon}
                                                onChange={updateIcon}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.deleteContainer}>
                            {!showDelete ? (
                                <button
                                    className={styles.button}
                                    type="button"
                                    value={String(showDelete)}
                                    onClick={renderDelete}>
                                    Want to Delete Server?
                                </button>
                            ) : (
                                <button
                                    className={styles.button}
                                    type="button"
                                    value={String(showDelete)}
                                    onClick={renderDelete}>
                                    Don't Delete Server
                                </button>
                            )}
                        </div>
                        <div className={styles.deleteButtonContainer}>
                            {showDelete && (
                                <ServerDeleteButton
                                    selectedServer={selectedServer}
                                />
                            )}
                        </div>
                        <div className={styles.updateContainer}>
                            {!showDelete && (
                                <>
                                    <Button onClick={goBack}>
                                        <StyledIcon
                                            path={mdiArrowLeftCircle}
                                            size={1}
                                        />
                                    </Button>
                                    <button className={styles.button}>
                                        Update Server
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </fieldset>
        </form>
    );
}
