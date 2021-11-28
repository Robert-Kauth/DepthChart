import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { destroyChannel } from "../../store/channels";

import styles from "./DeleteChannelButton.module.css";
// className={styles. }

export default function DeleteChannelButton({ channel, setShowModal }) {
    const dispatch = useDispatch();

    const [choice, setChoice] = useState("");
    const [error, setError] = useState("");

    const deleteChannel = (e) => {
        e.preventDefault();
        if (choice === channel.name) {
            setChoice("");
            dispatch(destroyChannel(channel.id));
            setShowModal(false);
        } else {
            setError("Must input correct channel name to delete");
        }
    };

    const updateChoice = (e) => {
        setError("");
        setChoice(e.target.value);
    };

    return (
        <div className={styles.deleteWrapper}>
            <div className={styles.warningContainer}>
                <p className={styles.deleteWarning}>
                    Once you delete a channel there is no turning back.
                </p>
            </div>
            <div className={styles.delete}>
                <label className={styles.deleteWarningLabel}>
                    Type the channels name and click delete to permanently
                    delete
                </label>
                <ul className={styles.error}>
                    <li className={styles.indivError}>{error}</li>
                </ul>
                <div>
                    <input
                        className={styles.deleteInput}
                        type="text"
                        value={choice}
                        placeholder={channel.name}
                        onChange={updateChoice}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={deleteChannel}>
                        Delete Channel
                    </button>
                </div>
            </div>
        </div>
    );
}
