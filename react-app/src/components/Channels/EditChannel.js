import React, { useState } from "react";

import DeleteChannelButton from "./DeleteChannelButton";

import styles from "./EditChannel.module.css";
// className={styles. }

export default function EditChannel({ channel, setShowModal }) {
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

    return (
        <div>
            <form>
                <fieldset>
                    <legend>Edit Channel Info</legend>
                    <div>
                        {errors.map((error, ind) => (
                            <div>
                                <legend>Errors:</legend>
                                <div key={ind}>{error}</div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder={channel.name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Topic</label>
                        <input
                            type="text"
                            value={topic}
                            placeholder={channel.topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        {!newIcon ? (
                            <button
                                type="button"
                                value={newIcon}
                                onClick={setShowField}>
                                Update Icon
                            </button>
                        ) : (
                            <button
                                type="button"
                                value={newIcon}
                                onClick={setShowField}>
                                Don't update Icon
                            </button>
                        )}
                    </div>
                    <div>
                        {newIcon && (
                            <div>
                                <label>New Icon URL</label>
                                <input
                                    type="url"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.buttonContainer}>
                        <div>
                            <button className={styles.button} type="submit">
                                Create
                            </button>
                        </div>
                        <div>
                            {!showDelete ? (
                                <button
                                    type="button"
                                    value={showDelete}
                                    onClick={renderDelete}>
                                    Want to Delete Channel?
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    value={showDelete}
                                    onClick={renderDelete}>
                                    Don't Delete
                                </button>
                            )}
                        </div>
                        <div>
                            {showDelete && (
                                <div className={styles.delete}>
                                    <DeleteChannelButton
                                        channel={channel}
                                        setShowModal={setShowModal}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
