import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserServers } from "../../store/user_servers";
import { editServer } from "../../store/servers";
import DeleteButton from "./DeleteButton";

export default function EditServer({ setShowModal }) {
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
                    name: selectedServer.name,
                    topic,
                    icon: selectedServer.icon,
                };
            } else {
                edit = {
                    id: serverId,
                    name: selectedServer.name,
                    topic,
                    icon,
                };
            }
            dispatch(editServer(edit));
            setShowModal(false);
        }
    };

    useEffect(() => {
        dispatch(getUserServers(user_id));
    }, [dispatch, user_id]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div>
                        {errors.map((error, ind) => (
                            <div>
                                <legend>Errors:</legend>
                                <div key={ind}>{error}</div>
                            </div>
                        ))}
                    </div>
                    {!serverId && (
                        <div>
                            <legend>Edit Server</legend>
                            <label>Name of server</label>
                            <select
                                onChange={(e) => setServerId(e.target.value)}>
                                <option>
                                    --Please choose a server to edit--
                                </option>
                                {user_servers &&
                                    Object.values(user_servers).map(
                                        (server) => (
                                            <option
                                                key={server.id}
                                                value={server.id}>
                                                {server.name}
                                            </option>
                                        )
                                    )}
                            </select>
                        </div>
                    )}
                    {serverId && (
                        <div>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder={selectedServer.name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Topic</label>
                                <input
                                    type="text"
                                    value={topic}
                                    placeholder={selectedServer.topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>
                            <div>
                                <div>
                                    <label>Current Icon</label>
                                    <img
                                        src={selectedServer.icon}
                                        alt="Server Icon"
                                    />
                                </div>
                                <div>
                                    <div>
                                        <button
                                            type="button"
                                            value={newIcon}
                                            onClick={setShowField}>
                                            Update Icon?
                                        </button>
                                    </div>
                                    <div>
                                        {newIcon && (
                                            <input
                                                type="url"
                                                value={icon}
                                                onChange={(e) =>
                                                    setIcon(e.target.value)
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button>Update Server</button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    value={showDelete}
                                    onClick={renderDelete}>
                                    Want to Delete Server?
                                </button>
                            </div>
                            <div>
                                {showDelete && (
                                    <DeleteButton
                                        selectedServer={selectedServer}
                                        setShowModal={setShowModal}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </fieldset>
            </form>
        </div>
    );
}
