import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserServers } from "../../store/user_servers";
import { editServer } from "../../store/servers";
import { hideModal } from "../../store/modal";
import ServerDeleteButton from "../ServerDeleteButton";

import styles from "./EditServerForm.module.css";

export default function EditServerForm() {
    const dispatch = useDispatch();

    const servers = useSelector((state) => state.user_servers);
    const user_id = useSelector((state) => state.session.user.id);

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [serverId, setServerId] = useState("");
    const [topic, setTopic] = useState("");
    const [icon, setIcon] = useState("");
    const [newIcon, setNewIcon] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    let user_servers;
    if (servers) {
        user_servers = Object.values(servers).map((server) => {
            if (server.owner_id === user_id) {
                return server;
            }
            return user_servers;
        });
    }

    let selectedServer;
    if (serverId) {
        selectedServer = servers[serverId];
    }

    const setShowField = (e) => {
        e.preventDefault();
        setNewIcon(!newIcon);
    };

    const renderDelete = (e) => {
        e.preventDefault();
        setShowDelete(!showDelete);
    };

    const validateEdit = () => {
        const err = [];
        if (name.length < 2) {
            err.push("Name must be at least 2 characters long");
        }
        if (topic.length < 5) {
            err.push("Topic must be at least 5 characters long");
        }
        setErrors(err);
        return err;
    };

    const handleSubmit = (e) => {
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

    const updateName = (e) => {
        setErrors([]);
        setName(e.target.value);
    };

    const updateTopic = (e) => {
        setErrors([]);
        setTopic(e.target.value);
    };

    const updateIcon = (e) => {
        setErrors([]);
        setIcon(e.target.value);
    };

    useEffect(() => {
        dispatch(getUserServers(user_id));
    }, [dispatch, user_id]);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset className={styles.field}>
                <legend className={styles.legend}>Edit Server</legend>
                <ul className={styles.errors}>
                    {errors.map((error, ind) => (
                        <li className={styles.error} key={ind}>
                            {error}
                        </li>
                    ))}
                </ul>
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
                                    <option key={server.id} value={server.id}>
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
                                        value={newIcon}
                                        onClick={setShowField}>
                                        Update Icon?
                                    </button>
                                ) : (
                                    <button
                                        className={styles.button}
                                        type="button"
                                        value={newIcon}
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
                                    value={showDelete}
                                    onClick={renderDelete}>
                                    Want to Delete Server?
                                </button>
                            ) : (
                                <button
                                    className={styles.button}
                                    type="button"
                                    value={showDelete}
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
                                <button className={styles.button}>
                                    Update Server
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </fieldset>
        </form>
    );
}
