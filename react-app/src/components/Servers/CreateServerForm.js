import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createServer } from "../../store/servers";

import styles from "./CreateServer.module.css";
// className={styles. }

export default function CreateServerForm({ setShowModal }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [icon, setIcon] = useState("");

    function isValidURL(string) {
        const regEx =
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
        let res = string.match(regEx);
        return res !== null;
    }

    const validateServer = () => {
        const errors = [];
        if (!name.length) {
            errors.push("We need to know the name of your server");
        }
        if (topic.length < 5) {
            errors.push("Your server needs a topic of at least 5 characters");
        }
        if (!isValidURL(icon)) errors.push("Please provide a valid URL");
        setErrors(errors);
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateServer();

        if (!errors.length) {
            setErrors([]);
            const data = await dispatch(createServer({ name, topic, icon }));
            if (data) {
                setErrors(data);
            }
            setShowModal(false);
        }
    };

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>Create New Server</legend>
                    {errors.map((error, ind) => (
                        <div>
                            <legend>Errors:</legend>
                            <div key={ind}>{error}</div>
                        </div>
                    ))}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    <div>
                        <label>Topic</label>
                        <input
                            type="text"
                            name="topic"
                            onChange={(e) => setTopic(e.target.value)}
                            value={topic}
                            required
                        />
                    </div>
                    <div>
                        <label>Icon</label>
                        <input
                            type="url"
                            name="icon"
                            onChange={(e) => setIcon(e.target.value)}
                            value={icon}
                            required
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
