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
        if (!name.length || name.length < 4) {
            errors.push("Server name should be at least 5 characters long");
        }
        if (topic.length < 5) {
            errors.push("Server topic should be at least 5 characters long");
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
                    <legend className={styles.legend}>Create New Server</legend>
                    <ul className={styles.errors}>
                        {errors.map((error, idx) => (
                            <li className={styles.error} key={idx}>
                                {error}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.inputs}>
                        <div className={styles.nameWrapper}>
                            <label className={styles.nameLabel} htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={updateName}
                                value={name}
                            />
                        </div>
                        <div className={styles.topicWrapper}>
                            <label className={styles.topicLabel}>Topic:</label>
                            <input
                                type="text"
                                name="topic"
                                onChange={updateTopic}
                                value={topic}
                            />
                        </div>
                        <div className={styles.iconWrapper}>
                            <label className={styles.iconLabel}>Icon:</label>
                            <input
                                type="url"
                                name="icon"
                                onChange={updateIcon}
                                value={icon}
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
