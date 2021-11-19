import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createChannel } from "../../store/channels";

import styles from "./CreateChannel.module.css";
// className={styles. }

export default function CreateChannel({ setShowModal, currentServer }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [icon, setIcon] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newChannel = {
            name,
            server_id: currentServer.id,
            topic,
            icon,
        };
        const data = dispatch(createChannel(newChannel));
        if (data) {
            setErrors(data.errors);
        }
        setShowModal(false);
    };

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Create New Channel</legend>
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
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Topic</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Icon</label>
                        <input
                            type="url"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type="submit">
                            Create
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
