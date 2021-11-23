import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { destroyServer } from "../../store/servers";

import styles from "./DeleteButton.module.css";
// className={styles. }

export default function DeleteButton({ selectedServer, setShowModal }) {
    const dispatch = useDispatch();

    const [choice, setChoice] = useState("");
    const [errors, setErrors] = useState([]);

    const deleteServer = (e) => {
        e.preventDefault();
        if (choice === selectedServer.name) {
            setChoice("");
            dispatch(destroyServer(selectedServer.id));
            setShowModal(false);
        } else {
            setErrors("Must input correct server name to delete");
        }
    };

    return (
        <div className={styles.deleteWrapper}>
            <ul className={styles.errors}>
                {errors.map((error, idx) => (
                    <li className={styles.error} key={idx}>
                        {error}
                    </li>
                ))}
            </ul>
            <div className={styles.warningContainer}>
                <p className={styles.deleteWarning}>
                    Once you delete a server there is no turning back.
                </p>
            </div>
            <div className={styles.delete}>
                <label className={styles.deleteWarningLabel}>
                    Type the servers name and click delete to permanently delete
                    server
                </label>
                <div>
                    <input
                        className={styles.deleteInput}
                        type="text"
                        value={choice}
                        placeholder={selectedServer.name}
                        onChange={(e) => setChoice(e.target.value)}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={deleteServer}>
                        Delete Server
                    </button>
                </div>
            </div>
        </div>
    );
}
