import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideModal } from "../../store/modal";
import { editChannel } from "../../store/channels";
import DeleteChannelButton from "../DeleteChannelButton";

import styles from "./EditChannelForm.module.css";
import Errors from "../Errors";
// className={styles. }

export default function EditChannelForm() {
    const dispatch = useDispatch();

    const channel = useSelector((state) => state.channels.channel);

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [icon, setIcon] = useState("");
    const [newIcon, setNewIcon] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const renderDelete = (e) => {
        e.preventDefault();
        setShowDelete(!showDelete);
    };
    const setShowField = (e) => {
        e.preventDefault();
        setNewIcon(!newIcon);
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
                    id: channel.id,
                    server_id: channel.server_id,
                    name,
                    topic,
                    icon: channel.icon,
                };
            } else {
                edit = {
                    id: channel.id,
                    server_id: channel.server_id,
                    name,
                    topic,
                    icon,
                };
            }
            dispatch(editChannel(edit));
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

    if (!channel) {
        return null;
    }

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Edit Channel Info</legend>
                    <Errors errors={errors} />
                    <div className={styles.nameWrapper}>
                        <label className={styles.nameLabel}>Name:</label>
                        <input
                            type="text"
                            value={name}
                            placeholder={channel?.name}
                            onChange={updateName}
                        />
                    </div>
                    <div className={styles.topicWrapper}>
                        <label className={styles.topicLabel}>Topic:</label>
                        <input
                            type="text"
                            value={topic}
                            placeholder={channel.topic}
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
                                src={channel.icon}
                                alt="Channel Icon"
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
                                        <label className={styles.newIconLabel}>
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
                    <div className={styles.buttonContainer}>
                        <div className={styles.deleteContainer}>
                            {!showDelete ? (
                                <button
                                    className={styles.button}
                                    type="button"
                                    value={showDelete}
                                    onClick={renderDelete}>
                                    Delete Channel?
                                </button>
                            ) : (
                                <button
                                    className={styles.button}
                                    type="button"
                                    value={showDelete}
                                    onClick={renderDelete}>
                                    Don't Delete
                                </button>
                            )}
                        </div>
                        <div className={styles.deleteButtonContainer}>
                            {showDelete && (
                                <DeleteChannelButton channel={channel} />
                            )}
                        </div>
                        <div className={styles.updateContainer}>
                            {!showDelete && (
                                <button className={styles.button}>
                                    Update Channel
                                </button>
                            )}
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
