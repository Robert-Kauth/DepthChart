import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditChannelModal from "./EditChannelModal";

import { loadAllChannelMessages } from "../../store/messages";

import styles from "./ChannelCard.module.css";
// className={styles. }

export default function ChannelCard({ channel }) {
    const dispatch = useDispatch();

    // const serverChannels = useSelector((state) => state.channels);
    const [selectedChannel, setSelectedChannel] = useState(null);

    const selectChannel = () => {
        setSelectedChannel(channel.id);
    };
    console.log(selectedChannel, "selected channel");

    // useEffect(() => {
    //     setSelectedChannel(
    //         JSON.parse(window.localStorage.getItem("selectedChannel"))
    //     );
    // }, []);

    // useEffect(() => {
    //     window.localStorage.setItem(
    //         "selectedChannel",
    //         JSON.stringify(selectedChannel)
    //     );
    // }, [selectedChannel]);

    useEffect(() => {
        dispatch(loadAllChannelMessages(selectedChannel));
    }, [dispatch, selectedChannel]);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.selectButton}
                onClick={selectChannel}
                value={channel.id}>
                <div className={styles.iconWrapper}>
                    <img src={channel.icon} alt="Channel icon" />
                </div>
                <div className={styles.name}>{channel.name}</div>
                <div className={styles.topic}>{channel.topic}</div>
                <div className={styles.crud}>
                    <div className={styles.edit}>
                        <EditChannelModal channel={channel} />
                    </div>
                </div>
            </div>
        </div>
    );
}
