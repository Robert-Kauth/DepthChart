import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { destroyServer } from "../../store/servers";

import styles from "./DeleteButton.module.css";

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
        <div>
            <ul className={styles.errors}>
                {errors.map((error, idx) => (
                    <li className={styles.error} key={idx}>
                        {error}
                    </li>
                ))}
            </ul>
            <p>Once you delete a server there is no turning back.</p>
            <div>
                <label>
                    Type the servers name and click delete to permanently delete
                    server
                </label>
                <input
                    type="text"
                    value={choice}
                    placeholder={selectedServer.name}
                    onChange={(e) => setChoice(e.target.value)}
                />
            </div>
            <button onClick={deleteServer}>Delete Server</button>
        </div>
    );
}
