import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { destroyChannel } from "../../store/channels";

import styles from "./DeleteChannelButton.module.css";
// className={styles. }

export default function DeleteChannelButton({ channel, setShowModal }) {
    const dispatch = useDispatch();

    const [choice, setChoice] = useState("");
    const [errors, setErrors] = useState([]);

    const deleteChannel = (e) => {
        e.preventDefault();
        if (choice === channel.name) {
            setChoice("");
            dispatch(destroyChannel(channel.id));
            setShowModal(false);
        } else {
            setErrors("Must input correct channel name to delete");
        }
    };
    console.log(errors, "delete errors");

    return (
        <div>
            <p>Once you delete a channel there is no turning back.</p>
            <div>
                <div>
                    <label>
                        Type the channel name and click delete to permanently
                        delete channel
                    </label>
                </div>
                <ul className={styles.errors}>
                    <li className={styles.error}>{errors}</li>
                </ul>
                <div>
                    <input
                        type="text"
                        value={choice}
                        placeholder={channel.name}
                        onChange={(e) => setChoice(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={deleteChannel}>Delete Channel</button>
        </div>
    );
}
