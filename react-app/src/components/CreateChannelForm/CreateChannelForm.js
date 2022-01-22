import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { createChannel } from "../../store/channels";
import { hideModal } from "../../store/modal";
import Errors from "../Errors";

import styles from "./CreateChannelForm.module.css";
// className={styles. }

export default function CreateChannelForm() {
    const dispatch = useDispatch();
    const { currentServerId } = useParams();

    const currentServer = useSelector(
        (state) => state.servers.all[currentServerId]
    );

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [icon, setIcon] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newChannel = {
            name,
            server_id: currentServer.id,
            topic,
            icon,
        };
        const data = await dispatch(createChannel(newChannel));
        if (data) {
            setErrors(data);
        } else {
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

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>
                        Create New Channel
                    </legend>
                    <Errors errors={errors} />
                    <div className={styles.inputs}>
                        <div className={styles.nameWrapper}>
                            <label className={styles.nameLabel} htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={updateName}
                            />
                        </div>
                        <div className={styles.topicWrapper}>
                            <label className={styles.topicLabel}>Topic:</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={updateTopic}
                            />
                        </div>
                        <div className={styles.iconWrapper}>
                            <label className={styles.iconLabel}>Icon:</label>
                            <input
                                type="url"
                                value={icon}
                                onChange={updateIcon}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type="submit">
                            Create
                        </button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}
