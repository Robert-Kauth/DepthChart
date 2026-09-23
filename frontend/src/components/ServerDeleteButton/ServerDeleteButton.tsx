import { useState, ChangeEvent, MouseEvent } from "react";

import { destroyServer } from "../../store/servers";
import { hideModal } from "../../store/modal";
import { useAppDispatch } from "../../store/hooks";
import type { Server } from "../../types";

import styles from "./ServerDeleteButton.module.css";
// className={styles. }

export default function ServerDeleteButton({
    selectedServer,
}: {
    selectedServer: Server;
}) {
    const dispatch = useAppDispatch();

    const [choice, setChoice] = useState("");
    const [error, setError] = useState("");

    const deleteServer = (e: MouseEvent) => {
        e.preventDefault();
        if (choice === selectedServer.name) {
            setChoice("");
            dispatch(destroyServer(selectedServer.id));
            dispatch(hideModal());
        } else {
            setError("Must input correct server name to delete");
        }
    };
    const updateChoice = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setChoice(e.target.value);
    };

    return (
        <div className={styles.deleteWrapper}>
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
                <ul className={styles.error}>
                    <li className={styles.indivError}>{error}</li>
                </ul>
                <div>
                    <input
                        className={styles.deleteInput}
                        type="text"
                        value={choice}
                        placeholder={selectedServer.name}
                        onChange={updateChoice}
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
